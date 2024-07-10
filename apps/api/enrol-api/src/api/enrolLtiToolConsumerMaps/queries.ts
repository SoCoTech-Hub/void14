import { db } from "@soco/enrol-db/client";
import { eq } from "@soco/enrol-db";
import { type EnrolLtiToolConsumerMapId, enrolLtiToolConsumerMapIdSchema, enrolLtiToolConsumerMaps } from "@soco/enrol-db/schema/enrolLtiToolConsumerMaps";

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


