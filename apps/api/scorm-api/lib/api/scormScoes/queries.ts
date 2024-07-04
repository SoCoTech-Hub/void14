import { eq } from "drizzle-orm";

import type { ScormScoeId } from "../db/schema/scormScoes";
import { db } from "../db/index";
import { scorms } from "../db/schema/scorms";
import { scormScoeIdSchema, scormScoes } from "../db/schema/scormScoes";

export const getScormScoes = async () => {
  const rows = await db
    .select({ scormScoe: scormScoes, scorm: scorms })
    .from(scormScoes)
    .leftJoin(scorms, eq(scormScoes.scormId, scorms.id));
  const s = rows.map((r) => ({ ...r.scormScoe, scorm: r.scorm }));
  return { scormScoes: s };
};

export const getScormScoeById = async (id: ScormScoeId) => {
  const { id: scormScoeId } = scormScoeIdSchema.parse({ id });
  const [row] = await db
    .select({ scormScoe: scormScoes, scorm: scorms })
    .from(scormScoes)
    .where(eq(scormScoes.id, scormScoeId))
    .leftJoin(scorms, eq(scormScoes.scormId, scorms.id));
  if (row === undefined) return {};
  const s = { ...row.scormScoe, scorm: row.scorm };
  return { scormScoe: s };
};
