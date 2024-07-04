import { eq } from "drizzle-orm";

import type { ScormId } from "../db/schema/scorms";
import { db } from "../db/index";
import { scormIdSchema, scorms } from "../db/schema/scorms";

export const getScorms = async () => {
  const rows = await db.select().from(scorms);
  const s = rows;
  return { scorms: s };
};

export const getScormById = async (id: ScormId) => {
  const { id: scormId } = scormIdSchema.parse({ id });
  const [row] = await db.select().from(scorms).where(eq(scorms.id, scormId));
  if (row === undefined) return {};
  const s = row;
  return { scorm: s };
};