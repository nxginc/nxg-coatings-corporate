import test from "node:test"
import assert from "node:assert/strict"
import { hashAdminPassword, verifyAdminPassword } from "../lib/admin-password.mjs"

test("admin password hashes verify only the matching password", async () => {
  const encoded = await hashAdminPassword("a-secure-example-password")

  assert.match(encoded, /^scrypt\$[a-f0-9]{32}\$[a-f0-9]{128}$/)
  assert.equal(await verifyAdminPassword("a-secure-example-password", encoded), true)
  assert.equal(await verifyAdminPassword("a-different-password", encoded), false)
})

test("admin password hashes reject malformed input", async () => {
  assert.equal(await verifyAdminPassword("", "invalid"), false)
  assert.equal(await verifyAdminPassword("password", "scrypt$bad$hash"), false)
  await assert.rejects(() => hashAdminPassword("short"))
})
