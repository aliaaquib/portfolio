import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { readToken } from "@/sanity/lib/env";

const draftModeHandler = readToken
  ? defineEnableDraftMode({
      client: client.withConfig({ token: readToken }),
    })
  : null;

export async function GET(request: Request) {
  if (!draftModeHandler) {
    return new Response("Missing SANITY_API_READ_TOKEN", { status: 500 });
  }

  return draftModeHandler.GET(request);
}
