import { db } from "@soco/scorm-db/client";
import { eq } from "@soco/scorm-db";
import { type ScormId, scormIdSchema, scorms } from "@soco/scorm-db/schema/scorms";

export const getScorms = async () => {
  const rows = await db.select().from(scorms);
  const s = rows
  return { scorms: s };
};

export const getScormById = async (id: ScormId) => {
  const { id: scormId } = scormIdSchema.parse({ id });
  const [row] = await db.select().from(scorms).where(eq(scorms.id, scormId));
  if (row === undefined) return {};
  const s = row;
  return { scorm: s };
};


