import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type LtiserviceGradebookserviceId, ltiserviceGradebookserviceIdSchema, ltiserviceGradebookservices } from "@/lib/db/schema/ltiserviceGradebookservices";

export const getLtiserviceGradebookservices = async () => {
  const rows = await db.select().from(ltiserviceGradebookservices);
  const l = rows
  return { ltiserviceGradebookservices: l };
};

export const getLtiserviceGradebookserviceById = async (id: LtiserviceGradebookserviceId) => {
  const { id: ltiserviceGradebookserviceId } = ltiserviceGradebookserviceIdSchema.parse({ id });
  const [row] = await db.select().from(ltiserviceGradebookservices).where(eq(ltiserviceGradebookservices.id, ltiserviceGradebookserviceId));
  if (row === undefined) return {};
  const l = row;
  return { ltiserviceGradebookservice: l };
};


