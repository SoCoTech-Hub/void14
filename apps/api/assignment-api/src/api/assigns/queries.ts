import type { AssignId } from "@soco/assignment-db/schema/assigns";
import { db, eq } from "@soco/assignment-db";
import { assignIdSchema, assigns } from "@soco/assignment-db/schema/assigns";

export const getAssigns = async () => {
  const rows = await db.select().from(assigns);
  const a = rows;
  return { assigns: a };
};

export const getAssignById = async (id: AssignId) => {
  const { id: assignId } = assignIdSchema.parse({ id });
  const [row] = await db.select().from(assigns).where(eq(assigns.id, assignId));
  if (row === undefined) return {};
  const a = row;
  return { assign: a };
};
