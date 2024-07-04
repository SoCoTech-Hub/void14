import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { DataRecordId } from "../db/schema/dataRecords";
import { db } from "../db/index";
import { dataRecordIdSchema, dataRecords } from "../db/schema/dataRecords";
import { datas } from "../db/schema/datas";

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
