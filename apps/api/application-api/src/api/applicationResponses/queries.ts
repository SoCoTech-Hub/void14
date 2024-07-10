import { db } from "@soco/application-db/client";
import { eq, and } from "@soco/application-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type ApplicationResponseId, applicationResponseIdSchema, applicationResponses } from "@soco/application-db/schema/applicationResponses";
import { jobApplications } from "@soco/application-db/schema/jobApplications";

export const getApplicationResponses = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ applicationResponse: applicationResponses, jobApplication: jobApplications }).from(applicationResponses).leftJoin(jobApplications, eq(applicationResponses.jobApplicationId, jobApplications.id)).where(eq(applicationResponses.userId, session?.user.id!));
  const a = rows .map((r) => ({ ...r.applicationResponse, jobApplication: r.jobApplication})); 
  return { applicationResponses: a };
};

export const getApplicationResponseById = async (id: ApplicationResponseId) => {
  const { session } = await getUserAuth();
  const { id: applicationResponseId } = applicationResponseIdSchema.parse({ id });
  const [row] = await db.select({ applicationResponse: applicationResponses, jobApplication: jobApplications }).from(applicationResponses).where(and(eq(applicationResponses.id, applicationResponseId), eq(applicationResponses.userId, session?.user.id!))).leftJoin(jobApplications, eq(applicationResponses.jobApplicationId, jobApplications.id));
  if (row === undefined) return {};
  const a =  { ...row.applicationResponse, jobApplication: row.jobApplication } ;
  return { applicationResponse: a };
};


