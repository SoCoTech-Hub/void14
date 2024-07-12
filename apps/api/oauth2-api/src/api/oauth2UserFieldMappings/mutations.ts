import { db } from "@soco/oauth2-db/client";
import { and, eq } from "@soco/oauth2-db";
import { 
  type Oauth2UserFieldMappingId, 
  type NewOauth2UserFieldMappingParams,
  type UpdateOauth2UserFieldMappingParams, 
  updateOauth2UserFieldMappingSchema,
  insertOauth2UserFieldMappingSchema, 
  oauth2UserFieldMappings,
  oauth2UserFieldMappingIdSchema 
} from "@soco/oauth2-db/schema/oauth2UserFieldMappings";
import { getUserAuth } from "@soco/auth-service";

export const createOauth2UserFieldMapping = async (oauth2UserFieldMapping: NewOauth2UserFieldMappingParams) => {
  const { session } = await getUserAuth();
  const newOauth2UserFieldMapping = insertOauth2UserFieldMappingSchema.parse({ ...oauth2UserFieldMapping, userId: session?.user.id! });
  try {
    const [o] =  await db.insert(oauth2UserFieldMappings).values(newOauth2UserFieldMapping).returning();
    return { oauth2UserFieldMapping: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2UserFieldMapping = async (id: Oauth2UserFieldMappingId, oauth2UserFieldMapping: UpdateOauth2UserFieldMappingParams) => {
  const { session } = await getUserAuth();
  const { id: oauth2UserFieldMappingId } = oauth2UserFieldMappingIdSchema.parse({ id });
  const newOauth2UserFieldMapping = updateOauth2UserFieldMappingSchema.parse({ ...oauth2UserFieldMapping, userId: session?.user.id! });
  try {
    const [o] =  await db
     .update(oauth2UserFieldMappings)
     .set({...newOauth2UserFieldMapping, updatedAt: new Date() })
     .where(and(eq(oauth2UserFieldMappings.id, oauth2UserFieldMappingId!), eq(oauth2UserFieldMappings.userId, session?.user.id!)))
     .returning();
    return { oauth2UserFieldMapping: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOauth2UserFieldMapping = async (id: Oauth2UserFieldMappingId) => {
  const { session } = await getUserAuth();
  const { id: oauth2UserFieldMappingId } = oauth2UserFieldMappingIdSchema.parse({ id });
  try {
    const [o] =  await db.delete(oauth2UserFieldMappings).where(and(eq(oauth2UserFieldMappings.id, oauth2UserFieldMappingId!), eq(oauth2UserFieldMappings.userId, session?.user.id!)))
    .returning();
    return { oauth2UserFieldMapping: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

