import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EnrolLtiAppRegistrationId, enrolLtiAppRegistrationIdSchema, enrolLtiAppRegistrations } from "@/lib/db/schema/enrolLtiAppRegistrations";

export const getEnrolLtiAppRegistrations = async () => {
  const rows = await db.select().from(enrolLtiAppRegistrations);
  const e = rows
  return { enrolLtiAppRegistrations: e };
};

export const getEnrolLtiAppRegistrationById = async (id: EnrolLtiAppRegistrationId) => {
  const { id: enrolLtiAppRegistrationId } = enrolLtiAppRegistrationIdSchema.parse({ id });
  const [row] = await db.select().from(enrolLtiAppRegistrations).where(eq(enrolLtiAppRegistrations.id, enrolLtiAppRegistrationId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiAppRegistration: e };
};


