import { redirect } from "next/navigation";

export default function SignUpPage() {
  // This will redirect anyone who tries to visit /sign-up back to the home page
  redirect("/");
  return null;
}   