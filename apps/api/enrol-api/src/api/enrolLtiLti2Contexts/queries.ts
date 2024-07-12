import type { EnrolLtiLti2ContextId } from "@soco/enrol-db/schema/enrolLtiLti2Contexts";
import { eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolLtiLti2ContextIdSchema,
  enrolLtiLti2Contexts,
} from "@soco/enrol-db/schema/enrolLtiLti2Contexts";

export const getEnrolLtiLti2Contexts = async () => {
  const rows = await db.select().from(enrolLtiLti2Contexts);
  const e = rows;
  return { enrolLtiLti2Contexts: e };
};

export const getEnrolLtiLti2ContextById = async (id: EnrolLtiLti2ContextId) => {
  const { id: enrolLtiLti2ContextId } = enrolLtiLti2ContextIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(enrolLtiLti2Contexts)
    .where(eq(enrolLtiLti2Contexts.id, enrolLtiLti2ContextId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiLti2Context: e };
};
