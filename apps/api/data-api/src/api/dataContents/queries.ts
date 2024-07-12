import type { DataContentId } from "@soco/data-db/schema/dataContents";
import { eq } from "@soco/data-db";
import { db } from "@soco/data-db/client";
import {
  dataContentIdSchema,
  dataContents,
} from "@soco/data-db/schema/dataContents";
import { dataRecords } from "@soco/data-db/schema/dataRecords";
import { fields } from "@soco/data-db/schema/fields";

export const getDataContents = async () => {
  const rows = await db
    .select({
      dataContent: dataContents,
      field: fields,
      dataRecord: dataRecords,
    })
    .from(dataContents)
    .leftJoin(fields, eq(dataContents.fieldId, fields.id))
    .leftJoin(dataRecords, eq(dataContents.dataRecordId, dataRecords.id));
  const d = rows.map((r) => ({
    ...r.dataContent,
    field: r.field,
    dataRecord: r.dataRecord,
  }));
  return { dataContents: d };
};

export const getDataContentById = async (id: DataContentId) => {
  const { id: dataContentId } = dataContentIdSchema.parse({ id });
  const [row] = await db
    .select({
      dataContent: dataContents,
      field: fields,
      dataRecord: dataRecords,
    })
    .from(dataContents)
    .where(eq(dataContents.id, dataContentId))
    .leftJoin(fields, eq(dataContents.fieldId, fields.id))
    .leftJoin(dataRecords, eq(dataContents.dataRecordId, dataRecords.id));
  if (row === undefined) return {};
  const d = {
    ...row.dataContent,
    field: row.field,
    dataRecord: row.dataRecord,
  };
  return { dataContent: d };
};
