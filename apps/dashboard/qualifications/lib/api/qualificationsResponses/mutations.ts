import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type QualificationsResponseId, 
  type NewQualificationsResponseParams,
  type UpdateQualificationsResponseParams, 
  updateQualificationsResponseSchema,
  insertQualificationsResponseSchema, 
  qualificationsResponses,
  qualificationsResponseIdSchema 
} from "@/lib/db/schema/qualificationsResponses";
import { getUserAuth } from "@/lib/auth/utils";

export const createQualificationsResponse = async (qualificationsResponse: NewQualificationsResponseParams) => {
  const { session } = await getUserAuth();
  const newQualificationsResponse = insertQualificationsResponseSchema.parse({ ...qualificationsResponse, userId: session?.user.id! });
  try {
    const [q] =  await db.insert(qualificationsResponses).values(newQualificationsResponse).returning();
    return { qualificationsResponse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQualificationsResponse = async (id: QualificationsResponseId, qualificationsResponse: UpdateQualificationsResponseParams) => {
  const { session } = await getUserAuth();
  const { id: qualificationsResponseId } = qualificationsResponseIdSchema.parse({ id });
  const newQualificationsResponse = updateQualificationsResponseSchema.parse({ ...qualificationsResponse, userId: session?.user.id! });
  try {
    const [q] =  await db
     .update(qualificationsResponses)
     .set(newQualificationsResponse)
     .where(and(eq(qualificationsResponses.id, qualificationsResponseId!), eq(qualificationsResponses.userId, session?.user.id!)))
     .returning();
    return { qualificationsResponse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQualificationsResponse = async (id: QualificationsResponseId) => {
  const { session } = await getUserAuth();
  const { id: qualificationsResponseId } = qualificationsResponseIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(qualificationsResponses).where(and(eq(qualificationsResponses.id, qualificationsResponseId!), eq(qualificationsResponses.userId, session?.user.id!)))
    .returning();
    return { qualificationsResponse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

