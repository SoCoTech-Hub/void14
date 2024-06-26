import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type RegistrationHubId, registrationHubIdSchema, registrationHubs } from "@/lib/db/schema/registrationHubs";

export const getRegistrationHubs = async () => {
  const rows = await db.select().from(registrationHubs);
  const r = rows
  return { registrationHubs: r };
};

export const getRegistrationHubById = async (id: RegistrationHubId) => {
  const { id: registrationHubId } = registrationHubIdSchema.parse({ id });
  const [row] = await db.select().from(registrationHubs).where(eq(registrationHubs.id, registrationHubId));
  if (row === undefined) return {};
  const r = row;
  return { registrationHub: r };
};


