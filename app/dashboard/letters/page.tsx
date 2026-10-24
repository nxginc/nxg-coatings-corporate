import { redirect } from "next/navigation"
import LetterBuilder from "./LetterBuilder"
import { getAdminSession } from "@/lib/auth"

export default async function LettersPage() {
  if (!(await getAdminSession())) redirect("/login")
  return <LetterBuilder />
}
