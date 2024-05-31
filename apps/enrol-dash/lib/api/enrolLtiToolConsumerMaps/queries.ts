import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EnrolLtiToolConsumerMapId, enrolLtiToolConsumerMapIdSchema, enrolLtiToolConsumerMaps } from "@/lib/db/schema/enrolLtiToolConsumerMaps";

export const getEnrolLtiToolConsumerMaps = async () => {
  const rows = await db.select().from(enrolLtiToolConsumerMaps);
  const e = rows
  return { enrolLtiToolConsumerMaps: e };
};

export const getEnrolLtiToolConsumerMapById = async (id: EnrolLtiToolConsumerMapId) => {
  const { id: enrolLtiToolConsumerMapId } = enrolLtiToolConsumerMapIdSchema.parse({ id });
  const [row] = await db.select().from(enrolLtiToolConsumerMaps).where(eq(enrolLtiToolConsumerMaps.id, enrolLtiToolConsumerMapId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiToolConsumerMap: e };
};


