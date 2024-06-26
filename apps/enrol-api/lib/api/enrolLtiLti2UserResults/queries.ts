import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EnrolLtiLti2UserResultId, enrolLtiLti2UserResultIdSchema, enrolLtiLti2UserResults } from "@/lib/db/schema/enrolLtiLti2UserResults";

export const getEnrolLtiLti2UserResults = async () => {
  const rows = await db.select().from(enrolLtiLti2UserResults);
  const e = rows
  return { enrolLtiLti2UserResults: e };
};

export const getEnrolLtiLti2UserResultById = async (id: EnrolLtiLti2UserResultId) => {
  const { id: enrolLtiLti2UserResultId } = enrolLtiLti2UserResultIdSchema.parse({ id });
  const [row] = await db.select().from(enrolLtiLti2UserResults).where(eq(enrolLtiLti2UserResults.id, enrolLtiLti2UserResultId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiLti2UserResult: e };
};


