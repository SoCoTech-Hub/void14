import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertJobApplicationsApplicationCategorySchema,
  jobApplicationsApplicationCategories,
  JobApplicationsApplicationCategoryId,
  jobApplicationsApplicationCategoryIdSchema,
  NewJobApplicationsApplicationCategoryParams,
  UpdateJobApplicationsApplicationCategoryParams,
  updateJobApplicationsApplicationCategorySchema,
} from "../../db/schema/jobApplicationsApplicationCategories";

export const createJobApplicationsApplicationCategory = async (
  jobApplicationsApplicationCategory: NewJobApplicationsApplicationCategoryParams,
) => {
  const newJobApplicationsApplicationCategory =
    insertJobApplicationsApplicationCategorySchema.parse(
      jobApplicationsApplicationCategory,
    );
  try {
    const [j] = await db
      .insert(jobApplicationsApplicationCategories)
      .values(newJobApplicationsApplicationCategory)
      .returning();
    return { jobApplicationsApplicationCategory: j };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateJobApplicationsApplicationCategory = async (
  id: JobApplicationsApplicationCategoryId,
  jobApplicationsApplicationCategory: UpdateJobApplicationsApplicationCategoryParams,
) => {
  const { id: jobApplicationsApplicationCategoryId } =
    jobApplicationsApplicationCategoryIdSchema.parse({ id });
  const newJobApplicationsApplicationCategory =
    updateJobApplicationsApplicationCategorySchema.parse(
      jobApplicationsApplicationCategory,
    );
  try {
    const [j] = await db
      .update(jobApplicationsApplicationCategories)
      .set(newJobApplicationsApplicationCategory)
      .where(
        eq(
          jobApplicationsApplicationCategories.id,
          jobApplicationsApplicationCategoryId!,
        ),
      )
      .returning();
    return { jobApplicationsApplicationCategory: j };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteJobApplicationsApplicationCategory = async (
  id: JobApplicationsApplicationCategoryId,
) => {
  const { id: jobApplicationsApplicationCategoryId } =
    jobApplicationsApplicationCategoryIdSchema.parse({ id });
  try {
    const [j] = await db
      .delete(jobApplicationsApplicationCategories)
      .where(
        eq(
          jobApplicationsApplicationCategories.id,
          jobApplicationsApplicationCategoryId!,
        ),
      )
      .returning();
    return { jobApplicationsApplicationCategory: j };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
