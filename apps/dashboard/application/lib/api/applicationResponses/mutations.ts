import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ApplicationResponseId, 
  type NewApplicationResponseParams,
  type UpdateApplicationResponseParams, 
  updateApplicationResponseSchema,
  insertApplicationResponseSchema, 
  applicationResponses,
  applicationResponseIdSchema 
} from "@/lib/db/schema/applicationResponses";
import { getUserAuth } from "@/lib/auth/utils";

export const createApplicationResponse = async (applicationResponse: NewApplicationResponseParams) => {
  const { session } = await getUserAuth();
  const newApplicationResponse = insertApplicationResponseSchema.parse({ ...applicationResponse, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(applicationResponses).values(newApplicationResponse).returning();
    return { applicationResponse: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateApplicationResponse = async (id: ApplicationResponseId, applicationResponse: UpdateApplicationResponseParams) => {
  const { session } = await getUserAuth();
  const { id: applicationResponseId } = applicationResponseIdSchema.parse({ id });
  const newApplicationResponse = updateApplicationResponseSchema.parse({ ...applicationResponse, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(applicationResponses)
     .set({...newApplicationResponse, updatedAt: new Date() })
     .where(and(eq(applicationResponses.id, applicationResponseId!), eq(applicationResponses.userId, session?.user.id!)))
     .returning();
    return { applicationResponse: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteApplicationResponse = async (id: ApplicationResponseId) => {
  const { session } = await getUserAuth();
  const { id: applicationResponseId } = applicationResponseIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(applicationResponses).where(and(eq(applicationResponses.id, applicationResponseId!), eq(applicationResponses.userId, session?.user.id!)))
    .returning();
    return { applicationResponse: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

