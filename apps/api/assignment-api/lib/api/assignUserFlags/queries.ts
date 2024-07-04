import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { AssignUserFlagId } from "../db/schema/assignUserFlags";
import { db } from "../db/index";
import { assignments } from "../db/schema/assignments";
import {
  assignUserFlagIdSchema,
  assignUserFlags,
} from "../db/schema/assignUserFlags";

export const getAssignUserFlags = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ assignUserFlag: assignUserFlags, assignment: assignments })
    .from(assignUserFlags)
    .leftJoin(assignments, eq(assignUserFlags.assignmentId, assignments.id))
    .where(eq(assignUserFlags.userId, session?.user.id!));
  const a = rows.map((r) => ({
    ...r.assignUserFlag,
    assignment: r.assignment,
  }));
  return { assignUserFlags: a };
};

export const getAssignUserFlagById = async (id: AssignUserFlagId) => {
  const { session } = await getUserAuth();
  const { id: assignUserFlagId } = assignUserFlagIdSchema.parse({ id });
  const [row] = await db
    .select({ assignUserFlag: assignUserFlags, assignment: assignments })
    .from(assignUserFlags)
    .where(
      and(
        eq(assignUserFlags.id, assignUserFlagId),
        eq(assignUserFlags.userId, session?.user.id!),
      ),
    )
    .leftJoin(assignments, eq(assignUserFlags.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a = { ...row.assignUserFlag, assignment: row.assignment };
  return { assignUserFlag: a };
};