import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { UserEnrolmentId } from "../db/schema/userEnrolments";
import { db } from "../db/index";
import {
  userEnrolmentIdSchema,
  userEnrolments,
} from "../db/schema/userEnrolments";

export const getUserEnrolments = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(userEnrolments)
    .where(eq(userEnrolments.userId, session?.user.id!));
  const u = rows;
  return { userEnrolments: u };
};

export const getUserEnrolmentById = async (id: UserEnrolmentId) => {
  const { session } = await getUserAuth();
  const { id: userEnrolmentId } = userEnrolmentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(userEnrolments)
    .where(
      and(
        eq(userEnrolments.id, userEnrolmentId),
        eq(userEnrolments.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const u = row;
  return { userEnrolment: u };
};
