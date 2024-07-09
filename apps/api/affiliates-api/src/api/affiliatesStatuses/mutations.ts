import type {
  AffiliatesStatusId,
  NewAffiliatesStatusParams,
  UpdateAffiliatesStatusParams,
} from "@soco/affiliates-db/schema/affiliatesStatuses";
import { db, eq } from "@soco/affiliates-db";
import {
  affiliatesStatuses,
  affiliatesStatusIdSchema,
  insertAffiliatesStatusSchema,
  updateAffiliatesStatusSchema,
} from "@soco/affiliates-db/schema/affiliatesStatuses";

export const createAffiliatesStatus = async (
  affiliatesStatus: NewAffiliatesStatusParams,
) => {
  const newAffiliatesStatus =
    insertAffiliatesStatusSchema.parse(affiliatesStatus);
  try {
    const [a] = await db
      .insert(affiliatesStatuses)
      .values(newAffiliatesStatus)
      .returning();
    return { affiliatesStatus: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAffiliatesStatus = async (
  id: AffiliatesStatusId,
  affiliatesStatus: UpdateAffiliatesStatusParams,
) => {
  const { id: affiliatesStatusId } = affiliatesStatusIdSchema.parse({ id });
  const newAffiliatesStatus =
    updateAffiliatesStatusSchema.parse(affiliatesStatus);
  try {
    const [a] = await db
      .update(affiliatesStatuses)
      .set(newAffiliatesStatus)
      .where(eq(affiliatesStatuses.id, affiliatesStatusId!))
      .returning();
    return { affiliatesStatus: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAffiliatesStatus = async (id: AffiliatesStatusId) => {
  const { id: affiliatesStatusId } = affiliatesStatusIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(affiliatesStatuses)
      .where(eq(affiliatesStatuses.id, affiliatesStatusId!))
      .returning();
    return { affiliatesStatus: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
