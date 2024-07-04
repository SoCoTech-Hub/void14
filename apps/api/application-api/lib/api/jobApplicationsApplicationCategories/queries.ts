import { eq } from "drizzle-orm";

import type { JobApplicationsApplicationCategoryId } from "../db/schema/jobApplicationsApplicationCategories";
import { db } from "../db/index";
import { applicationCategories } from "../db/schema/applicationCategories";
import { jobApplications } from "../db/schema/jobApplications";
import {
  jobApplicationsApplicationCategories,
  jobApplicationsApplicationCategoryIdSchema,
} from "../db/schema/jobApplicationsApplicationCategories";

export const getJobApplicationsApplicationCategories = async () => {
  const rows = await db
    .select({
      jobApplicationsApplicationCategory: jobApplicationsApplicationCategories,
      jobApplication: jobApplications,
      applicationCategory: applicationCategories,
    })
    .from(jobApplicationsApplicationCategories)
    .leftJoin(
      jobApplications,
      eq(
        jobApplicationsApplicationCategories.jobApplicationId,
        jobApplications.id,
      ),
    )
    .leftJoin(
      applicationCategories,
      eq(
        jobApplicationsApplicationCategories.applicationCategoryId,
        applicationCategories.id,
      ),
    );
  const j = rows.map((r) => ({
    ...r.jobApplicationsApplicationCategory,
    jobApplication: r.jobApplication,
    applicationCategory: r.applicationCategory,
  }));
  return { jobApplicationsApplicationCategories: j };
};

export const getJobApplicationsApplicationCategoryById = async (
  id: JobApplicationsApplicationCategoryId,
) => {
  const { id: jobApplicationsApplicationCategoryId } =
    jobApplicationsApplicationCategoryIdSchema.parse({ id });
  const [row] = await db
    .select({
      jobApplicationsApplicationCategory: jobApplicationsApplicationCategories,
      jobApplication: jobApplications,
      applicationCategory: applicationCategories,
    })
    .from(jobApplicationsApplicationCategories)
    .where(
      eq(
        jobApplicationsApplicationCategories.id,
        jobApplicationsApplicationCategoryId,
      ),
    )
    .leftJoin(
      jobApplications,
      eq(
        jobApplicationsApplicationCategories.jobApplicationId,
        jobApplications.id,
      ),
    )
    .leftJoin(
      applicationCategories,
      eq(
        jobApplicationsApplicationCategories.applicationCategoryId,
        applicationCategories.id,
      ),
    );
  if (row === undefined) return {};
  const j = {
    ...row.jobApplicationsApplicationCategory,
    jobApplication: row.jobApplication,
    applicationCategory: row.applicationCategory,
  };
  return { jobApplicationsApplicationCategory: j };
};
