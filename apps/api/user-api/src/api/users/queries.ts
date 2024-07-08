import { db } from "@soco/user-db/index";
import { eq } from "drizzle-orm";
import { type UserId, userIdSchema, users } from "@soco/user-db/schema/users";

export const getUsers = async () => {
  const rows = await db.select().from(users);
  const u = rows
  return { users: u };
};

export const getUserById = async (id: UserId) => {
  const { id: userId } = userIdSchema.parse({ id });
  const [row] = await db.select().from(users).where(eq(users.id, userId));
  if (row === undefined) return {};
  const u = row;
  return { user: u };
};


