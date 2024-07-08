import { db } from "@soco/user-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type UserEnrolmentId, userEnrolmentIdSchema, userEnrolments } from "@soco/user-db/schema/userEnrolments";

export const getUserEnrolments = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(userEnrolments).where(eq(userEnrolments.userId, session?.user.id!));
  const u = rows
  return { userEnrolments: u };
};

export const getUserEnrolmentById = async (id: UserEnrolmentId) => {
  const { session } = await getUserAuth();
  const { id: userEnrolmentId } = userEnrolmentIdSchema.parse({ id });
  const [row] = await db.select().from(userEnrolments).where(and(eq(userEnrolments.id, userEnrolmentId), eq(userEnrolments.userId, session?.user.id!)));
  if (row === undefined) return {};
  const u = row;
  return { userEnrolment: u };
};


