import type {
  AffiliatesDetailId,
  NewAffiliatesDetailParams,
  UpdateAffiliatesDetailParams,
} from "@soco/affiliates-db/schema/affiliatesDetails";
import { db, eq } from "@soco/affiliates-db";
import {
  affiliatesDetailIdSchema,
  affiliatesDetails,
  insertAffiliatesDetailSchema,
  updateAffiliatesDetailSchema,
} from "@soco/affiliates-db/schema/affiliatesDetails";

export const createAffiliatesDetail = async (
  affiliatesDetail: NewAffiliatesDetailParams,
) => {
  const newAffiliatesDetail =
    insertAffiliatesDetailSchema.parse(affiliatesDetail);
  try {
    const [a] = await db
      .insert(affiliatesDetails)
      .values(newAffiliatesDetail)
      .returning();
    return { affiliatesDetail: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAffiliatesDetail = async (
  id: AffiliatesDetailId,
  affiliatesDetail: UpdateAffiliatesDetailParams,
) => {
  const { id: affiliatesDetailId } = affiliatesDetailIdSchema.parse({ id });
  const newAffiliatesDetail =
    updateAffiliatesDetailSchema.parse(affiliatesDetail);
  try {
    const [a] = await db
      .update(affiliatesDetails)
      .set(newAffiliatesDetail)
      .where(eq(affiliatesDetails.id, affiliatesDetailId!))
      .returning();
    return { affiliatesDetail: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAffiliatesDetail = async (id: AffiliatesDetailId) => {
  const { id: affiliatesDetailId } = affiliatesDetailIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(affiliatesDetails)
      .where(eq(affiliatesDetails.id, affiliatesDetailId!))
      .returning();
    return { affiliatesDetail: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
