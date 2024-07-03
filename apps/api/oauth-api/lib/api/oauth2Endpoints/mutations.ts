import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  Oauth2EndpointId, 
  NewOauth2EndpointParams,
  UpdateOauth2EndpointParams, 
  updateOauth2EndpointSchema,
  insertOauth2EndpointSchema, 
  oauth2Endpoints,
  oauth2EndpointIdSchema 
} from "@/lib/db/schema/oauth2Endpoints";
import { getUserAuth } from "@/lib/auth/utils";

export const createOauth2Endpoint = async (oauth2Endpoint: NewOauth2EndpointParams) => {
  const { session } = await getUserAuth();
  const newOauth2Endpoint = insertOauth2EndpointSchema.parse({ ...oauth2Endpoint, userId: session?.user.id! });
  try {
    const [o] =  await db.insert(oauth2Endpoints).values(newOauth2Endpoint).returning();
    return { oauth2Endpoint: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2Endpoint = async (id: Oauth2EndpointId, oauth2Endpoint: UpdateOauth2EndpointParams) => {
  const { session } = await getUserAuth();
  const { id: oauth2EndpointId } = oauth2EndpointIdSchema.parse({ id });
  const newOauth2Endpoint = updateOauth2EndpointSchema.parse({ ...oauth2Endpoint, userId: session?.user.id! });
  try {
    const [o] =  await db
     .update(oauth2Endpoints)
     .set({...newOauth2Endpoint, updatedAt: new Date() })
     .where(and(eq(oauth2Endpoints.id, oauth2EndpointId!), eq(oauth2Endpoints.userId, session?.user.id!)))
     .returning();
    return { oauth2Endpoint: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOauth2Endpoint = async (id: Oauth2EndpointId) => {
  const { session } = await getUserAuth();
  const { id: oauth2EndpointId } = oauth2EndpointIdSchema.parse({ id });
  try {
    const [o] =  await db.delete(oauth2Endpoints).where(and(eq(oauth2Endpoints.id, oauth2EndpointId!), eq(oauth2Endpoints.userId, session?.user.id!)))
    .returning();
    return { oauth2Endpoint: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

