import { redirect } from "next/navigation";
import { createChatSession } from "@/lib/repos";

export const dynamic = "force-dynamic";

export default async function NewChatPage() {
  const session = createChatSession({ title: "Free-form chat" });
  redirect(`/chat/${session.id}`);
}
