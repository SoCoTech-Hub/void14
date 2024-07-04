import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { JobApplicationId } from "../db/schema/jobApplications";
import { db } from "../db/index";
import {
  jobApplicationIdSchema,
  jobApplications,
} from "../db/schema/jobApplications";

export const getJobApplications = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(jobApplications)
    .where(eq(jobApplications.userId, session?.user.id!));
  const j = rows;
  return { jobApplications: j };
};

export const getJobApplicationById = async (id: JobApplicationId) => {
  const { session } = await getUserAuth();
  const { id: jobApplicationId } = jobApplicationIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(jobApplications)
    .where(
      and(
        eq(jobApplications.id, jobApplicationId),
        eq(jobApplications.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const j = row;
  return { jobApplication: j };
};
