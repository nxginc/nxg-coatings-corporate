import { randomBytes, scrypt, timingSafeEqual } from "node:crypto"

const KEY_LENGTH = 64
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }

function deriveKey(password, salt) {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, key) => {
      if (error) reject(error)
      else resolve(key)
    })
  })
}

export async function hashAdminPassword(password) {
  if (typeof password !== "string" || password.length < 12 || password.length > 1024) {
    throw new Error("Admin passwords must contain 12 to 1024 characters.")
  }

  const salt = randomBytes(16)
  const key = await deriveKey(password, salt)
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`
}

export async function verifyAdminPassword(password, encodedHash) {
  if (
    typeof password !== "string" ||
    password.length === 0 ||
    password.length > 1024 ||
    typeof encodedHash !== "string"
  ) {
    return false
  }

  const match = /^scrypt\$([a-f0-9]{32})\$([a-f0-9]{128})$/i.exec(encodedHash)
  if (!match) return false

  const expected = Buffer.from(match[2], "hex")
  const actual = await deriveKey(password, Buffer.from(match[1], "hex"))
  return timingSafeEqual(actual, expected)
}
