import type { ScormScoesDataId } from "@soco/scorm-db/schema/scormScoesDatas";
import { eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import { scormScoes } from "@soco/scorm-db/schema/scormScoes";
import {
  scormScoesDataIdSchema,
  scormScoesDatas,
} from "@soco/scorm-db/schema/scormScoesDatas";

export const getScormScoesDatas = async () => {
  const rows = await db
    .select({ scormScoesData: scormScoesDatas, scormScoe: scormScoes })
    .from(scormScoesDatas)
    .leftJoin(scormScoes, eq(scormScoesDatas.scormScoeId, scormScoes.id));
  const s = rows.map((r) => ({ ...r.scormScoesData, scormScoe: r.scormScoe }));
  return { scormScoesDatas: s };
};

export const getScormScoesDataById = async (id: ScormScoesDataId) => {
  const { id: scormScoesDataId } = scormScoesDataIdSchema.parse({ id });
  const [row] = await db
    .select({ scormScoesData: scormScoesDatas, scormScoe: scormScoes })
    .from(scormScoesDatas)
    .where(eq(scormScoesDatas.id, scormScoesDataId))
    .leftJoin(scormScoes, eq(scormScoesDatas.scormScoeId, scormScoes.id));
  if (row === undefined) return {};
  const s = { ...row.scormScoesData, scormScoe: row.scormScoe };
  return { scormScoesData: s };
};
