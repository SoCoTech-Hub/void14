import { getUserAuth } from "@soco/auth-service";
import { db } from "@soco/big-blue-button-db/client";
import { users } from "@soco/big-blue-button-db/schema/auth";
import { eq } from "@soco/big-blue-button-db";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Error", { status: 400 });
  const body = (await request.json()) as { name?: string; email?: string };

  await db.update(users).set({ ...body }).where(eq(users.id, session.user.id));
  revalidatePath("/account");
  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
