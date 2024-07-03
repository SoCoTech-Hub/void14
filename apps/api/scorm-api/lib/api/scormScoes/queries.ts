import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ScormScoeId, scormScoeIdSchema, scormScoes } from "@/lib/db/schema/scormScoes";
import { scorms } from "@/lib/db/schema/scorms";

export const getScormScoes = async () => {
  const rows = await db.select({ scormScoe: scormScoes, scorm: scorms }).from(scormScoes).leftJoin(scorms, eq(scormScoes.scormId, scorms.id));
  const s = rows .map((r) => ({ ...r.scormScoe, scorm: r.scorm})); 
  return { scormScoes: s };
};

export const getScormScoeById = async (id: ScormScoeId) => {
  const { id: scormScoeId } = scormScoeIdSchema.parse({ id });
  const [row] = await db.select({ scormScoe: scormScoes, scorm: scorms }).from(scormScoes).where(eq(scormScoes.id, scormScoeId)).leftJoin(scorms, eq(scormScoes.scormId, scorms.id));
  if (row === undefined) return {};
  const s =  { ...row.scormScoe, scorm: row.scorm } ;
  return { scormScoe: s };
};


