import { db } from "@soco/workshop-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type WorkshopSubmissionId, workshopSubmissionIdSchema, workshopSubmissions } from "@soco/workshop-db/schema/workshopSubmissions";
import { workshops } from "@soco/workshop-db/schema/workshops";

export const getWorkshopSubmissions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ workshopSubmission: workshopSubmissions, workshop: workshops }).from(workshopSubmissions).leftJoin(workshops, eq(workshopSubmissions.workshopId, workshops.id)).where(eq(workshopSubmissions.userId, session?.user.id!));
  const w = rows .map((r) => ({ ...r.workshopSubmission, workshop: r.workshop})); 
  return { workshopSubmissions: w };
};

export const getWorkshopSubmissionById = async (id: WorkshopSubmissionId) => {
  const { session } = await getUserAuth();
  const { id: workshopSubmissionId } = workshopSubmissionIdSchema.parse({ id });
  const [row] = await db.select({ workshopSubmission: workshopSubmissions, workshop: workshops }).from(workshopSubmissions).where(and(eq(workshopSubmissions.id, workshopSubmissionId), eq(workshopSubmissions.userId, session?.user.id!))).leftJoin(workshops, eq(workshopSubmissions.workshopId, workshops.id));
  if (row === undefined) return {};
  const w =  { ...row.workshopSubmission, workshop: row.workshop } ;
  return { workshopSubmission: w };
};


