import test from "node:test"
import assert from "node:assert/strict"
import {
  DATABASE_STATEMENT_TIMEOUT_MS,
  isDatabaseQueryTimeout,
  SMTP_TIMEOUTS,
} from "../lib/timeouts.mjs"

test("SMTP operations use positive bounded connection, greeting, and socket timeouts", () => {
  assert.deepEqual(SMTP_TIMEOUTS, {
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 30_000,
  })
  assert.ok(Object.values(SMTP_TIMEOUTS).every((timeout) => timeout > 0 && timeout <= 30_000))
})

test("PostgreSQL statements have a bounded server-side timeout", () => {
  assert.equal(DATABASE_STATEMENT_TIMEOUT_MS, 15_000)
  assert.ok(DATABASE_STATEMENT_TIMEOUT_MS > 0 && DATABASE_STATEMENT_TIMEOUT_MS <= 30_000)
})

test("PostgreSQL statement cancellations are recognized as controlled timeouts", () => {
  assert.equal(isDatabaseQueryTimeout({ code: "57014" }), true)
  assert.equal(isDatabaseQueryTimeout({ code: "42P01" }), false)
  assert.equal(isDatabaseQueryTimeout(null), false)
})
