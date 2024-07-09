import { db } from "@soco/registration-db/index";
import { eq } from "drizzle-orm";
import { 
  RegistrationHubId, 
  NewRegistrationHubParams,
  UpdateRegistrationHubParams, 
  updateRegistrationHubSchema,
  insertRegistrationHubSchema, 
  registrationHubs,
  registrationHubIdSchema 
} from "@soco/registration-db/schema/registrationHubs";

export const createRegistrationHub = async (registrationHub: NewRegistrationHubParams) => {
  const newRegistrationHub = insertRegistrationHubSchema.parse(registrationHub);
  try {
    const [r] =  await db.insert(registrationHubs).values(newRegistrationHub).returning();
    return { registrationHub: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRegistrationHub = async (id: RegistrationHubId, registrationHub: UpdateRegistrationHubParams) => {
  const { id: registrationHubId } = registrationHubIdSchema.parse({ id });
  const newRegistrationHub = updateRegistrationHubSchema.parse(registrationHub);
  try {
    const [r] =  await db
     .update(registrationHubs)
     .set({...newRegistrationHub, updatedAt: new Date() })
     .where(eq(registrationHubs.id, registrationHubId!))
     .returning();
    return { registrationHub: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRegistrationHub = async (id: RegistrationHubId) => {
  const { id: registrationHubId } = registrationHubIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(registrationHubs).where(eq(registrationHubs.id, registrationHubId!))
    .returning();
    return { registrationHub: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
