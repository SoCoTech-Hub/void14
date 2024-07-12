import type { RegistrationHubId } from "@soco/registration-db/schema/registrationHubs";
import { eq } from "@soco/registration-db";
import { db } from "@soco/registration-db/client";
import {
  registrationHubIdSchema,
  registrationHubs,
} from "@soco/registration-db/schema/registrationHubs";

export const getRegistrationHubs = async () => {
  const rows = await db.select().from(registrationHubs);
  const r = rows;
  return { registrationHubs: r };
};

export const getRegistrationHubById = async (id: RegistrationHubId) => {
  const { id: registrationHubId } = registrationHubIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(registrationHubs)
    .where(eq(registrationHubs.id, registrationHubId));
  if (row === undefined) return {};
  const r = row;
  return { registrationHub: r };
};
