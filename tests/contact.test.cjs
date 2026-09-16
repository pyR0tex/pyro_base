/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

// Exercise the source without adding a test runner or changing the Next build.
function loadSource(file, globals = {}, modules = {}) {
  const source = readFileSync(path.join(__dirname, "..", file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    require: (name) => modules[name] ?? require(name),
    ...globals,
  });
  return exports;
}

const valid = { name: " Visitor ", email: " visitor@example.com ", message: " Hello\nthere! ", website: "" };
const configured = {
  RESEND_API_KEY: "re_test_placeholder",
  CONTACT_EMAIL: "owner@example.com",
  CONTACT_FROM_EMAIL: "contact@example.com",
};
function request(body, type = "application/json") {
  return new Request("http://localhost/api/contact", {
    method: "POST", headers: { "content-type": type },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("invalid submissions never call the provider", async (t) => {
  t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected provider call"); });
  const { POST } = loadSource("app/api/contact/route.ts", { process: { env: configured } });
  const invalid = [
    ["{", 400], [null, 400], [[], 400],
    [{ ...valid, name: "  " }, 400], [{ ...valid, name: 3 }, 400],
    [{ ...valid, name: "x".repeat(101) }, 400], [{ ...valid, name: "Name\nHeader" }, 400],
    [{ ...valid, email: "" }, 400], [{ ...valid, email: "invalid" }, 400],
    [{ ...valid, email: "a".repeat(250) + "@example.com" }, 400],
    [{ ...valid, message: "  " }, 400], [{ ...valid, message: "x".repeat(5001) }, 400],
    [{ ...valid, website: "https://spam.example" }, 400], [{ ...valid, website: true }, 400],
    ["x".repeat(32_001), 413],
  ];
  for (const [body, status] of invalid) {
    const response = await POST(request(body));
    assert.equal(response.status, status);
    assert.equal((await response.json()).success, false);
  }
  assert.equal((await POST(request(valid, "text/plain"))).status, 415);
  assert.equal((await POST(request(valid, "application/json-invalid"))).status, 415);
  assert.equal(globalThis.fetch.mock.callCount(), 0);
});

test("valid submissions call the real Resend SDK with trimmed content and reply-to", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return Response.json({ id: "test-message-id" });
  });
  const { POST } = loadSource("app/api/contact/route.ts", { process: { env: configured } });
  const response = await POST(request(valid));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.deepEqual(calls[0].body, {
    from: configured.CONTACT_FROM_EMAIL, to: configured.CONTACT_EMAIL,
    reply_to: "visitor@example.com", subject: "pyR0tex.dev Contact — Visitor",
    text: "New message from pyR0tex.dev\n\nName: Visitor\nEmail: visitor@example.com\n\nMessage:\n\nHello\nthere!",
  });
});

test("missing configuration, provider errors, and network failures cannot report success", async (t) => {
  for (const key of Object.keys(configured)) {
    const { POST } = loadSource("app/api/contact/route.ts", { process: { env: { ...configured, [key]: "" } } });
    assert.equal((await POST(request(valid))).status, 503);
  }
  const { POST } = loadSource("app/api/contact/route.ts", { process: { env: configured } });
  const fetchMock = t.mock.method(globalThis, "fetch");
  for (const reply of [
    () => Response.json({ message: "private provider detail", name: "validation_error" }, { status: 422 }),
    () => Response.json({}),
    () => { throw new Error("private network detail"); },
  ]) {
    fetchMock.mock.mockImplementation(reply);
    const response = await POST(request(valid));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { success: false, error: "Something went wrong. Please try again." });
  }
});

function formHarness(fetch) {
  const states = [];
  let cursor = 0;
  const pending = { current: false };
  const react = {
    useId: () => "contact-test", useRef: () => pending,
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [states[index], (next) => { states[index] = next; }];
    },
  };
  const { default: Form } = loadSource("components/ContactForm.tsx", {
    fetch, FormData: class { constructor() { return new Map(Object.entries(valid)); } },
  }, { react });
  return () => { cursor = 0; return Form(); };
}

test("form disables pending submissions, prevents duplicates, and clears only on success", async () => {
  let finish;
  let calls = 0;
  let resets = 0;
  const render = formHarness((url, options) => {
    calls++;
    assert.equal(url, "/api/contact");
    assert.equal(options.method, "POST");
    return new Promise((resolve) => { finish = resolve; });
  });
  const event = { preventDefault() {}, currentTarget: { reset() { resets++; } } };
  const submit = render().props.onSubmit(event);
  const sending = render();
  assert.equal(sending.props["aria-busy"], true);
  const fieldset = sending.props.children[0];
  assert.equal(fieldset.props.disabled, true);
  assert.equal(fieldset.props.children.at(-1).props.children, "Sending…");
  await sending.props.onSubmit(event);
  assert.equal(calls, 1);
  finish(Response.json({ success: true }));
  await submit;
  assert.equal(resets, 1);
  assert.equal(render().props["aria-busy"], false);
  assert.equal(render().props.children[1].props.children, "Message sent. I'll get back to you soon.");
});

test("form retains inputs and shows safe feedback for all failure responses", async () => {
  for (const fetch of [
    async () => Response.json({ error: "private error" }, { status: 502 }),
    async () => Response.json({ success: false }),
    async () => new Response("not json"),
    async () => { throw new Error("private network detail"); },
  ]) {
    let resets = 0;
    const render = formHarness(fetch);
    await render().props.onSubmit({ preventDefault() {}, currentTarget: { reset() { resets++; } } });
    assert.equal(resets, 0);
    assert.equal(render().props.children[0].props.disabled, false);
    assert.equal(render().props.children[1].props.children, "Something went wrong. Please try again.");
  }
});
