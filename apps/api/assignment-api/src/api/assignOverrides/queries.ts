import type { AssignOverrideId } from "@soco/assignment-db/schema/assignOverrides";
import { and, eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import {
  assignOverrideIdSchema,
  assignOverrides,
} from "@soco/assignment-db/schema/assignOverrides";
import { assigns } from "@soco/assignment-db/schema/assigns";
import { getUserAuth } from "@soco/auth-service";

export const getAssignOverrides = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ assignOverride: assignOverrides, assign: assigns })
    .from(assignOverrides)
    .leftJoin(assigns, eq(assignOverrides.assignId, assigns.id))
    .where(eq(assignOverrides.userId, session?.user.id!));
  const a = rows.map((r) => ({ ...r.assignOverride, assign: r.assign }));
  return { assignOverrides: a };
};

export const getAssignOverrideById = async (id: AssignOverrideId) => {
  const { session } = await getUserAuth();
  const { id: assignOverrideId } = assignOverrideIdSchema.parse({ id });
  const [row] = await db
    .select({ assignOverride: assignOverrides, assign: assigns })
    .from(assignOverrides)
    .where(
      and(
        eq(assignOverrides.id, assignOverrideId),
        eq(assignOverrides.userId, session?.user.id!),
      ),
    )
    .leftJoin(assigns, eq(assignOverrides.assignId, assigns.id));
  if (row === undefined) return {};
  const a = { ...row.assignOverride, assign: row.assign };
  return { assignOverride: a };
};
