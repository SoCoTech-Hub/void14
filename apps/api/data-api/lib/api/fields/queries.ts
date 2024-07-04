import { eq } from "drizzle-orm";

import type { FieldId } from "../db/schema/fields";
import { db } from "../db/index";
import { datas } from "../db/schema/datas";
import { fieldIdSchema, fields } from "../db/schema/fields";

export const getFields = async () => {
  const rows = await db
    .select({ field: fields, data: datas })
    .from(fields)
    .leftJoin(datas, eq(fields.dataId, datas.id));
  const f = rows.map((r) => ({ ...r.field, data: r.data }));
  return { fields: f };
};

export const getFieldById = async (id: FieldId) => {
  const { id: fieldId } = fieldIdSchema.parse({ id });
  const [row] = await db
    .select({ field: fields, data: datas })
    .from(fields)
    .where(eq(fields.id, fieldId))
    .leftJoin(datas, eq(fields.dataId, datas.id));
  if (row === undefined) return {};
  const f = { ...row.field, data: row.data };
  return { field: f };
};
