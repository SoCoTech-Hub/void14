import { eq } from "drizzle-orm";

import type { ScormScoesDataId } from "../../db/schema/scormScoesDatas";
import { db } from "../../db/index";
import { scormScoes } from "../../db/schema/scormScoes";
import {
  scormScoesDataIdSchema,
  scormScoesDatas,
} from "../../db/schema/scormScoesDatas";

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
