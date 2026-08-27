import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const store = await draftMode();
  store.disable();

  redirect("/");
}
