import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { LtiSubmissionId } from "../db/schema/ltiSubmissions";
import { db } from "../db/index";
import {
  ltiSubmissionIdSchema,
  ltiSubmissions,
} from "../db/schema/ltiSubmissions";

export const getLtiSubmissions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(ltiSubmissions)
    .where(eq(ltiSubmissions.userId, session?.user.id!));
  const l = rows;
  return { ltiSubmissions: l };
};

export const getLtiSubmissionById = async (id: LtiSubmissionId) => {
  const { session } = await getUserAuth();
  const { id: ltiSubmissionId } = ltiSubmissionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(ltiSubmissions)
    .where(
      and(
        eq(ltiSubmissions.id, ltiSubmissionId),
        eq(ltiSubmissions.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const l = row;
  return { ltiSubmission: l };
};