import type { JobApplicationId } from "@soco/application-db/schema/jobApplications";
import { and, db, eq } from "@soco/application-db";
import {
  jobApplicationIdSchema,
  jobApplications,
} from "@soco/application-db/schema/jobApplications";
import { getUserAuth } from "@soco/auth-services";

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
