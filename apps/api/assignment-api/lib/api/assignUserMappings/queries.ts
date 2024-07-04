import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { AssignUserMappingId } from "../db/schema/assignUserMappings";
import { db } from "../db/index";
import { assignments } from "../db/schema/assignments";
import {
  assignUserMappingIdSchema,
  assignUserMappings,
} from "../db/schema/assignUserMappings";

export const getAssignUserMappings = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ assignUserMapping: assignUserMappings, assignment: assignments })
    .from(assignUserMappings)
    .leftJoin(assignments, eq(assignUserMappings.assignmentId, assignments.id))
    .where(eq(assignUserMappings.userId, session?.user.id!));
  const a = rows.map((r) => ({
    ...r.assignUserMapping,
    assignment: r.assignment,
  }));
  return { assignUserMappings: a };
};

export const getAssignUserMappingById = async (id: AssignUserMappingId) => {
  const { session } = await getUserAuth();
  const { id: assignUserMappingId } = assignUserMappingIdSchema.parse({ id });
  const [row] = await db
    .select({ assignUserMapping: assignUserMappings, assignment: assignments })
    .from(assignUserMappings)
    .where(
      and(
        eq(assignUserMappings.id, assignUserMappingId),
        eq(assignUserMappings.userId, session?.user.id!),
      ),
    )
    .leftJoin(assignments, eq(assignUserMappings.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a = { ...row.assignUserMapping, assignment: row.assignment };
  return { assignUserMapping: a };
};
