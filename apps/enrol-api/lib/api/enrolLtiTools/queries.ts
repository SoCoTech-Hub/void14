import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EnrolLtiToolId, enrolLtiToolIdSchema, enrolLtiTools } from "@/lib/db/schema/enrolLtiTools";

export const getEnrolLtiTools = async () => {
  const rows = await db.select().from(enrolLtiTools);
  const e = rows
  return { enrolLtiTools: e };
};

export const getEnrolLtiToolById = async (id: EnrolLtiToolId) => {
  const { id: enrolLtiToolId } = enrolLtiToolIdSchema.parse({ id });
  const [row] = await db.select().from(enrolLtiTools).where(eq(enrolLtiTools.id, enrolLtiToolId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiTool: e };
};


