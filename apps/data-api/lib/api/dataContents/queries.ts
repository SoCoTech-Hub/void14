import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type DataContentId, dataContentIdSchema, dataContents } from "@/lib/db/schema/dataContents";
import { fields } from "@/lib/db/schema/fields";
import { dataRecords } from "@/lib/db/schema/dataRecords";

export const getDataContents = async () => {
  const rows = await db.select({ dataContent: dataContents, field: fields, dataRecord: dataRecords }).from(dataContents).leftJoin(fields, eq(dataContents.fieldId, fields.id)).leftJoin(dataRecords, eq(dataContents.dataRecordId, dataRecords.id));
  const d = rows .map((r) => ({ ...r.dataContent, field: r.field, dataRecord: r.dataRecord})); 
  return { dataContents: d };
};

export const getDataContentById = async (id: DataContentId) => {
  const { id: dataContentId } = dataContentIdSchema.parse({ id });
  const [row] = await db.select({ dataContent: dataContents, field: fields, dataRecord: dataRecords }).from(dataContents).where(eq(dataContents.id, dataContentId)).leftJoin(fields, eq(dataContents.fieldId, fields.id)).leftJoin(dataRecords, eq(dataContents.dataRecordId, dataRecords.id));
  if (row === undefined) return {};
  const d =  { ...row.dataContent, field: row.field, dataRecord: row.dataRecord } ;
  return { dataContent: d };
};


