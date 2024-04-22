import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AuthLtiLinkedLoginId, authLtiLinkedLoginIdSchema, authLtiLinkedLogins } from "@/lib/db/schema/authLtiLinkedLogins";

export const getAuthLtiLinkedLogins = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(authLtiLinkedLogins).where(eq(authLtiLinkedLogins.userId, session?.user.id!));
  const a = rows
  return { authLtiLinkedLogins: a };
};

export const getAuthLtiLinkedLoginById = async (id: AuthLtiLinkedLoginId) => {
  const { session } = await getUserAuth();
  const { id: authLtiLinkedLoginId } = authLtiLinkedLoginIdSchema.parse({ id });
  const [row] = await db.select().from(authLtiLinkedLogins).where(and(eq(authLtiLinkedLogins.id, authLtiLinkedLoginId), eq(authLtiLinkedLogins.userId, session?.user.id!)));
  if (row === undefined) return {};
  const a = row;
  return { authLtiLinkedLogin: a };
};


