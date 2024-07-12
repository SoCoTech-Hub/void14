import type {
  MnetHost2serviceId,
  NewMnetHost2serviceParams,
  UpdateMnetHost2serviceParams,
} from "@soco/mnet-db/schema/mnetHost2services";
import { eq } from "@soco/mnet-db";
import { db } from "@soco/mnet-db/client";
import {
  insertMnetHost2serviceSchema,
  mnetHost2serviceIdSchema,
  mnetHost2services,
  updateMnetHost2serviceSchema,
} from "@soco/mnet-db/schema/mnetHost2services";

export const createMnetHost2service = async (
  mnetHost2service: NewMnetHost2serviceParams,
) => {
  const newMnetHost2service =
    insertMnetHost2serviceSchema.parse(mnetHost2service);
  try {
    const [m] = await db
      .insert(mnetHost2services)
      .values(newMnetHost2service)
      .returning();
    return { mnetHost2service: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetHost2service = async (
  id: MnetHost2serviceId,
  mnetHost2service: UpdateMnetHost2serviceParams,
) => {
  const { id: mnetHost2serviceId } = mnetHost2serviceIdSchema.parse({ id });
  const newMnetHost2service =
    updateMnetHost2serviceSchema.parse(mnetHost2service);
  try {
    const [m] = await db
      .update(mnetHost2services)
      .set(newMnetHost2service)
      .where(eq(mnetHost2services.id, mnetHost2serviceId!))
      .returning();
    return { mnetHost2service: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetHost2service = async (id: MnetHost2serviceId) => {
  const { id: mnetHost2serviceId } = mnetHost2serviceIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(mnetHost2services)
      .where(eq(mnetHost2services.id, mnetHost2serviceId!))
      .returning();
    return { mnetHost2service: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
