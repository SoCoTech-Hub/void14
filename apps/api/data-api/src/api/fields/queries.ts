import { db } from "@soco/data-db/client";
import { eq } from "@soco/data-db";
import { type FieldId, fieldIdSchema, fields } from "@soco/data-db/schema/fields";
import { datas } from "@soco/data-db/schema/datas";

export const getFields = async () => {
  const rows = await db.select({ field: fields, data: datas }).from(fields).leftJoin(datas, eq(fields.dataId, datas.id));
  const f = rows .map((r) => ({ ...r.field, data: r.data})); 
  return { fields: f };
};

export const getFieldById = async (id: FieldId) => {
  const { id: fieldId } = fieldIdSchema.parse({ id });
  const [row] = await db.select({ field: fields, data: datas }).from(fields).where(eq(fields.id, fieldId)).leftJoin(datas, eq(fields.dataId, datas.id));
  if (row === undefined) return {};
  const f =  { ...row.field, data: row.data } ;
  return { field: f };
};


