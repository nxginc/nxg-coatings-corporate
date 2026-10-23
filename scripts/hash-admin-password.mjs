import { hashAdminPassword } from "../lib/admin-password.mjs"

if (!process.stdin.isTTY || !process.stdin.setRawMode) {
  console.error("Run this command from an interactive terminal.")
  process.exitCode = 1
} else {
  const stdin = process.stdin
  const wasRaw = stdin.isRaw
  let password = ""

  process.stderr.write("Enter a new admin password (input hidden): ")
  stdin.setRawMode(true)
  stdin.resume()
  stdin.setEncoding("utf8")

  stdin.on("data", async (character) => {
    if (character === "\u0003") {
      process.stderr.write("\nCancelled.\n")
      stdin.setRawMode(wasRaw ?? false)
      process.exitCode = 130
      stdin.pause()
      return
    }

    if (character === "\r" || character === "\n") {
      stdin.setRawMode(wasRaw ?? false)
      stdin.pause()
      process.stderr.write("\n")
      try {
        process.stdout.write(`${await hashAdminPassword(password)}\n`)
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Unable to hash password.")
        process.exitCode = 1
      } finally {
        password = ""
      }
      return
    }

    if (character === "\u007f" || character === "\b") {
      password = password.slice(0, -1)
      return
    }

    password += character
  })
}
