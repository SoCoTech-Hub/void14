import { eq } from "drizzle-orm";

import type { AssignId } from "../db/schema/assigns";
import { db } from "../db/index";
import { assignIdSchema, assigns } from "../db/schema/assigns";

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
