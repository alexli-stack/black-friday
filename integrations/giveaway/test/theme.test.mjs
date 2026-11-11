import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../theme/assets/bfcm2026.js', import.meta.url), 'utf8');
const helper = source.slice(source.indexOf('    const giveawayResults = new Map();'), source.indexOf("    document.querySelectorAll('[data-gw]')"));
function harness() {
  const calls = { klaviyo: 0, crm: 0, klaviyoOk: true, crmOk: true };
  const context = vm.createContext({ URL, AbortSignal, location: { origin: 'https://www.1laser.com' },
    normPhone: () => '+16268004130',
    submitLead: async () => { calls.klaviyo++; return calls.klaviyoOk; },
    fetch: async (_url, init) => {
      calls.crm++; assert.deepEqual(JSON.parse(init.body), { email: 'person@example.com', phone: '+16268004130' });
      return { ok: calls.crmOk, json: async () => ({ accepted: calls.crmOk }) };
    }
  });
  vm.runInContext(helper + ';globalThis.submit = submitGiveaway;', context);
  return { calls, submit: (endpoint = 'https://giveaway.example/api/giveaway') => context.submit({ dataset: { giveawayEndpoint: endpoint } }, { email: 'person@example.com', phone: '(626) 800-4130' }) };
}
test('giveaway succeeds only when Klaviyo and CRM have accepted it', async () => {
  const h = harness(); h.calls.crmOk = false;
  assert.equal(await h.submit(), false);
  h.calls.crmOk = true;
  assert.equal(await h.submit(), true);
  assert.equal(h.calls.klaviyo, 1); assert.equal(h.calls.crm, 2);
});
test('retry after Klaviyo failure preserves CRM acceptance', async () => {
  const h = harness(); h.calls.klaviyoOk = false;
  assert.equal(await h.submit(), false); h.calls.klaviyoOk = true;
  assert.equal(await h.submit(), true);
  assert.equal(h.calls.klaviyo, 2); assert.equal(h.calls.crm, 1);
});
test('unconfigured endpoint retains existing Klaviyo behavior; insecure endpoint fails', async () => {
  const h = harness(); assert.equal(await h.submit(''), true);
  assert.equal(h.calls.crm, 0);
  assert.equal(await h.submit('http://insecure.example'), false);
  assert.equal(h.calls.klaviyo, 1);
});
