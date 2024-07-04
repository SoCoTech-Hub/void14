import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  affiliatesStatuses,
  AffiliatesStatusId,
  affiliatesStatusIdSchema,
  insertAffiliatesStatusSchema,
  NewAffiliatesStatusParams,
  UpdateAffiliatesStatusParams,
  updateAffiliatesStatusSchema,
} from "../db/schema/affiliatesStatuses";

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
