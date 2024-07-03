import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EnrolLtiLti2ConsumerId, enrolLtiLti2ConsumerIdSchema, enrolLtiLti2Consumers } from "@/lib/db/schema/enrolLtiLti2Consumers";

export const getEnrolLtiLti2Consumers = async () => {
  const rows = await db.select().from(enrolLtiLti2Consumers);
  const e = rows
  return { enrolLtiLti2Consumers: e };
};

export const getEnrolLtiLti2ConsumerById = async (id: EnrolLtiLti2ConsumerId) => {
  const { id: enrolLtiLti2ConsumerId } = enrolLtiLti2ConsumerIdSchema.parse({ id });
  const [row] = await db.select().from(enrolLtiLti2Consumers).where(eq(enrolLtiLti2Consumers.id, enrolLtiLti2ConsumerId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiLti2Consumer: e };
};


