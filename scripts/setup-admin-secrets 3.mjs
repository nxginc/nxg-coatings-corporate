import { randomBytes, scryptSync } from "node:crypto"
import { emitKeypressEvents } from "node:readline"

if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Run this command directly in a terminal so the password can be entered without echo.")
}

function readHidden(prompt) {
    return new Promise((resolve, reject) => {
        process.stdout.write(prompt)
        emitKeypressEvents(process.stdin)
        process.stdin.setRawMode(true)
        process.stdin.resume()
        let value = ""

        const finish = (error) => {
            process.stdin.off("keypress", onKeypress)
            process.stdin.setRawMode(false)
            process.stdout.write("\n")
            error ? reject(error) : resolve(value)
        }

        const onKeypress = (character, key) => {
            if (key?.ctrl && key.name === "c") return finish(new Error("Cancelled."))
            if (key?.name === "return") return finish()
            if (key?.name === "backspace") {
                value = value.slice(0, -1)
                process.stdout.write("\b \b")
                return
            }
            if (character && !key?.ctrl && character.length === 1) {
                value += character
                process.stdout.write("*")
            }
        }

        process.stdin.on("keypress", onKeypress)
    })
}

const password = await readHidden("Admin password (16+ characters): ")
if (password.length < 16) throw new Error("Use a password with at least 16 characters.")
const confirmation = await readHidden("Confirm admin password: ")
if (password !== confirmation) throw new Error("Passwords do not match.")

const salt = randomBytes(16).toString("hex")
const passwordHash = scryptSync(password, salt, 64).toString("hex")
const authSecret = randomBytes(32).toString("hex")
console.log(`AUTH_SECRET=${authSecret}`)
console.log(`ADMIN_PASSWORD_HASH=${salt}:${passwordHash}`)