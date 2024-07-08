import { db } from "@soco/scorm-db/index";
import { eq } from "drizzle-orm";
import { type ScormScoesDataId, scormScoesDataIdSchema, scormScoesDatas } from "@soco/scorm-db/schema/scormScoesDatas";
import { scormScoes } from "@soco/scorm-db/schema/scormScoes";

export const getScormScoesDatas = async () => {
  const rows = await db.select({ scormScoesData: scormScoesDatas, scormScoe: scormScoes }).from(scormScoesDatas).leftJoin(scormScoes, eq(scormScoesDatas.scormScoeId, scormScoes.id));
  const s = rows .map((r) => ({ ...r.scormScoesData, scormScoe: r.scormScoe})); 
  return { scormScoesDatas: s };
};

export const getScormScoesDataById = async (id: ScormScoesDataId) => {
  const { id: scormScoesDataId } = scormScoesDataIdSchema.parse({ id });
  const [row] = await db.select({ scormScoesData: scormScoesDatas, scormScoe: scormScoes }).from(scormScoesDatas).where(eq(scormScoesDatas.id, scormScoesDataId)).leftJoin(scormScoes, eq(scormScoesDatas.scormScoeId, scormScoes.id));
  if (row === undefined) return {};
  const s =  { ...row.scormScoesData, scormScoe: row.scormScoe } ;
  return { scormScoesData: s };
};


