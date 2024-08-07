import type { DataRecordId } from "@soco/data-db/schema/dataRecords";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/data-db";
import { db } from "@soco/data-db/client";
import {
  dataRecordIdSchema,
  dataRecords,
} from "@soco/data-db/schema/dataRecords";
import { datas } from "@soco/data-db/schema/datas";

export const getDataRecords = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ dataRecord: dataRecords, data: datas })
    .from(dataRecords)
    .leftJoin(datas, eq(dataRecords.dataId, datas.id))
    .where(eq(dataRecords.userId, session?.user.id!));
  const d = rows.map((r) => ({ ...r.dataRecord, data: r.data }));
  return { dataRecords: d };
};

export const getDataRecordById = async (id: DataRecordId) => {
  const { session } = await getUserAuth();
  const { id: dataRecordId } = dataRecordIdSchema.parse({ id });
  const [row] = await db
    .select({ dataRecord: dataRecords, data: datas })
    .from(dataRecords)
    .where(
      and(
        eq(dataRecords.id, dataRecordId),
        eq(dataRecords.userId, session?.user.id!),
      ),
    )
    .leftJoin(datas, eq(dataRecords.dataId, datas.id));
  if (row === undefined) return {};
  const d = { ...row.dataRecord, data: row.data };
  return { dataRecord: d };
};
