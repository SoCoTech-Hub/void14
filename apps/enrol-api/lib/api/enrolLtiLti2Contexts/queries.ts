import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EnrolLtiLti2ContextId, enrolLtiLti2ContextIdSchema, enrolLtiLti2Contexts } from "@/lib/db/schema/enrolLtiLti2Contexts";

export const getEnrolLtiLti2Contexts = async () => {
  const rows = await db.select().from(enrolLtiLti2Contexts);
  const e = rows
  return { enrolLtiLti2Contexts: e };
};

export const getEnrolLtiLti2ContextById = async (id: EnrolLtiLti2ContextId) => {
  const { id: enrolLtiLti2ContextId } = enrolLtiLti2ContextIdSchema.parse({ id });
  const [row] = await db.select().from(enrolLtiLti2Contexts).where(eq(enrolLtiLti2Contexts.id, enrolLtiLti2ContextId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiLti2Context: e };
};


