import { NextRequest } from "next/server";
import { z } from "zod";
import {
  deleteChatSession,
  listChatMessages,
  listChatSessions,
  renameChatSession,
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

const PatchBody = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(200),
});

export async function PATCH(req: NextRequest) {
  ensureSeeded();
  const data = PatchBody.parse(await req.json());
  const next = renameChatSession(data.id, data.title);
  if (!next) {
    return Response.json({ error: "session not found" }, { status: 404 });
  }
  return Response.json({ session: next });
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
