import type {
  ApplicationCategoryId,
  NewApplicationCategoryParams,
  UpdateApplicationCategoryParams,
} from "@soco/application-db/schema/applicationCategories";
import { eq } from "@soco/application-db";
import { db } from "@soco/application-db/client";
import {
  applicationCategories,
  applicationCategoryIdSchema,
  insertApplicationCategorySchema,
  updateApplicationCategorySchema,
} from "@soco/application-db/schema/applicationCategories";

export const createApplicationCategory = async (
  applicationCategory: NewApplicationCategoryParams,
) => {
  const newApplicationCategory =
    insertApplicationCategorySchema.parse(applicationCategory);
  try {
    const [a] = await db
      .insert(applicationCategories)
      .values(newApplicationCategory)
      .returning();
    return { applicationCategory: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateApplicationCategory = async (
  id: ApplicationCategoryId,
  applicationCategory: UpdateApplicationCategoryParams,
) => {
  const { id: applicationCategoryId } = applicationCategoryIdSchema.parse({
    id,
  });
  const newApplicationCategory =
    updateApplicationCategorySchema.parse(applicationCategory);
  try {
    const [a] = await db
      .update(applicationCategories)
      .set(newApplicationCategory)
      .where(eq(applicationCategories.id, applicationCategoryId!))
      .returning();
    return { applicationCategory: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteApplicationCategory = async (id: ApplicationCategoryId) => {
  const { id: applicationCategoryId } = applicationCategoryIdSchema.parse({
    id,
  });
  try {
    const [a] = await db
      .delete(applicationCategories)
      .where(eq(applicationCategories.id, applicationCategoryId!))
      .returning();
    return { applicationCategory: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
