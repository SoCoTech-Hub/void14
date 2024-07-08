import { db } from "@soco/lti-db/index";
import { eq } from "drizzle-orm";
import { 
  LtiToolProxyId, 
  NewLtiToolProxyParams,
  UpdateLtiToolProxyParams, 
  updateLtiToolProxySchema,
  insertLtiToolProxySchema, 
  ltiToolProxies,
  ltiToolProxyIdSchema 
} from "@soco/lti-db/schema/ltiToolProxies";

export const createLtiToolProxy = async (ltiToolProxy: NewLtiToolProxyParams) => {
  const newLtiToolProxy = insertLtiToolProxySchema.parse(ltiToolProxy);
  try {
    const [l] =  await db.insert(ltiToolProxies).values(newLtiToolProxy).returning();
    return { ltiToolProxy: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLtiToolProxy = async (id: LtiToolProxyId, ltiToolProxy: UpdateLtiToolProxyParams) => {
  const { id: ltiToolProxyId } = ltiToolProxyIdSchema.parse({ id });
  const newLtiToolProxy = updateLtiToolProxySchema.parse(ltiToolProxy);
  try {
    const [l] =  await db
     .update(ltiToolProxies)
     .set({...newLtiToolProxy, updatedAt: new Date() })
     .where(eq(ltiToolProxies.id, ltiToolProxyId!))
     .returning();
    return { ltiToolProxy: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLtiToolProxy = async (id: LtiToolProxyId) => {
  const { id: ltiToolProxyId } = ltiToolProxyIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(ltiToolProxies).where(eq(ltiToolProxies.id, ltiToolProxyId!))
    .returning();
    return { ltiToolProxy: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

