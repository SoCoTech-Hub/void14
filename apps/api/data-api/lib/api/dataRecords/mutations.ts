import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  DataRecordId,
  dataRecordIdSchema,
  dataRecords,
  insertDataRecordSchema,
  NewDataRecordParams,
  UpdateDataRecordParams,
  updateDataRecordSchema,
} from "../../db/schema/dataRecords";

export const createDataRecord = async (dataRecord: NewDataRecordParams) => {
  const { session } = await getUserAuth();
  const newDataRecord = insertDataRecordSchema.parse({
    ...dataRecord,
    userId: session?.user.id!,
  });
  try {
    const [d] = await db.insert(dataRecords).values(newDataRecord).returning();
    return { dataRecord: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDataRecord = async (
  id: DataRecordId,
  dataRecord: UpdateDataRecordParams,
) => {
  const { session } = await getUserAuth();
  const { id: dataRecordId } = dataRecordIdSchema.parse({ id });
  const newDataRecord = updateDataRecordSchema.parse({
    ...dataRecord,
    userId: session?.user.id!,
  });
  try {
    const [d] = await db
      .update(dataRecords)
      .set({ ...newDataRecord, updatedAt: new Date() })
      .where(
        and(
          eq(dataRecords.id, dataRecordId!),
          eq(dataRecords.userId, session?.user.id!),
        ),
      )
      .returning();
    return { dataRecord: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDataRecord = async (id: DataRecordId) => {
  const { session } = await getUserAuth();
  const { id: dataRecordId } = dataRecordIdSchema.parse({ id });
  try {
    const [d] = await db
      .delete(dataRecords)
      .where(
        and(
          eq(dataRecords.id, dataRecordId!),
          eq(dataRecords.userId, session?.user.id!),
        ),
      )
      .returning();
    return { dataRecord: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
