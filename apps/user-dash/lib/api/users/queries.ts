import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type UserId, userIdSchema, users } from "@/lib/db/schema/users";

export const getUsers = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(users).where(eq(users.userId, session?.user.id!));
  const u = rows
  return { users: u };
};

export const getUserById = async (id: UserId) => {
  const { session } = await getUserAuth();
  const { id: userId } = userIdSchema.parse({ id });
  const [row] = await db.select().from(users).where(and(eq(users.id, userId), eq(users.userId, session?.user.id!)));
  if (row === undefined) return {};
  const u = row;
  return { user: u };
};


