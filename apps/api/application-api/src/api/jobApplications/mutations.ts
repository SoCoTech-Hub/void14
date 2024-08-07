import type {
  JobApplicationId,
  NewJobApplicationParams,
  UpdateJobApplicationParams,
} from "@soco/application-db/schema/jobApplications";
import { and, eq } from "@soco/application-db";
import { db } from "@soco/application-db/client";
import {
  insertJobApplicationSchema,
  jobApplicationIdSchema,
  jobApplications,
  updateJobApplicationSchema,
} from "@soco/application-db/schema/jobApplications";
import { getUserAuth } from "@soco/auth-service";

export const createJobApplication = async (
  jobApplication: NewJobApplicationParams,
) => {
  const { session } = await getUserAuth();
  const newJobApplication = insertJobApplicationSchema.parse({
    ...jobApplication,
    userId: session?.user.id!,
  });
  try {
    const [j] = await db
      .insert(jobApplications)
      .values(newJobApplication)
      .returning();
    return { jobApplication: j };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateJobApplication = async (
  id: JobApplicationId,
  jobApplication: UpdateJobApplicationParams,
) => {
  const { session } = await getUserAuth();
  const { id: jobApplicationId } = jobApplicationIdSchema.parse({ id });
  const newJobApplication = updateJobApplicationSchema.parse({
    ...jobApplication,
    userId: session?.user.id!,
  });
  try {
    const [j] = await db
      .update(jobApplications)
      .set({ ...newJobApplication, updatedAt: new Date() })
      .where(
        and(
          eq(jobApplications.id, jobApplicationId!),
          eq(jobApplications.userId, session?.user.id!),
        ),
      )
      .returning();
    return { jobApplication: j };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteJobApplication = async (id: JobApplicationId) => {
  const { session } = await getUserAuth();
  const { id: jobApplicationId } = jobApplicationIdSchema.parse({ id });
  try {
    const [j] = await db
      .delete(jobApplications)
      .where(
        and(
          eq(jobApplications.id, jobApplicationId!),
          eq(jobApplications.userId, session?.user.id!),
        ),
      )
      .returning();
    return { jobApplication: j };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
