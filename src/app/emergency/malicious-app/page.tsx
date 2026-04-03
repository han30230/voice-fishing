import { redirect } from "next/navigation";

export default function MaliciousAppAliasPage() {
  redirect("/emergency/app-installed");
}
