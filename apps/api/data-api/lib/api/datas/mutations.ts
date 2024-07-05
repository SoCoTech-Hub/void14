import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  DataId,
  dataIdSchema,
  datas,
  insertDataSchema,
  NewDataParams,
  UpdateDataParams,
  updateDataSchema,
} from "../../db/schema/datas";

export const createData = async (data: NewDataParams) => {
  const newData = insertDataSchema.parse(data);
  try {
    const [d] = await db.insert(datas).values(newData).returning();
    return { data: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateData = async (id: DataId, data: UpdateDataParams) => {
  const { id: dataId } = dataIdSchema.parse({ id });
  const newData = updateDataSchema.parse(data);
  try {
    const [d] = await db
      .update(datas)
      .set({ ...newData, updatedAt: new Date() })
      .where(eq(datas.id, dataId!))
      .returning();
    return { data: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteData = async (id: DataId) => {
  const { id: dataId } = dataIdSchema.parse({ id });
  try {
    const [d] = await db.delete(datas).where(eq(datas.id, dataId!)).returning();
    return { data: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
