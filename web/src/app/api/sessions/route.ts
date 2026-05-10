import { NextRequest } from "next/server";
import {
  deleteChatSession,
  listChatMessages,
  listChatSessions,
} from "@/lib/repos";
import { ensureSeeded } from "@/lib/content-loader";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  ensureSeeded();
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const sid = Number(id);
    if (!Number.isFinite(sid)) {
      return Response.json({ error: "invalid id" }, { status: 400 });
    }
    return Response.json({ messages: listChatMessages(sid) });
  }
  return Response.json({ sessions: listChatSessions() });
}

export async function DELETE(req: NextRequest) {
  ensureSeeded();
  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!Number.isFinite(id)) {
    return Response.json({ error: "id required" }, { status: 400 });
  }
  deleteChatSession(id);
  return Response.json({ ok: true });
}
