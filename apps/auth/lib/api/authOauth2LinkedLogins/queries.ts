import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AuthOauth2LinkedLoginId, authOauth2LinkedLoginIdSchema, authOauth2LinkedLogins } from "@/lib/db/schema/authOauth2LinkedLogins";

export const getAuthOauth2LinkedLogins = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(authOauth2LinkedLogins).where(eq(authOauth2LinkedLogins.userId, session?.user.id!));
  const a = rows
  return { authOauth2LinkedLogins: a };
};

export const getAuthOauth2LinkedLoginById = async (id: AuthOauth2LinkedLoginId) => {
  const { session } = await getUserAuth();
  const { id: authOauth2LinkedLoginId } = authOauth2LinkedLoginIdSchema.parse({ id });
  const [row] = await db.select().from(authOauth2LinkedLogins).where(and(eq(authOauth2LinkedLogins.id, authOauth2LinkedLoginId), eq(authOauth2LinkedLogins.userId, session?.user.id!)));
  if (row === undefined) return {};
  const a = row;
  return { authOauth2LinkedLogin: a };
};


