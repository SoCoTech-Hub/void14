import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  AuthLtiLinkedLoginId, 
  NewAuthLtiLinkedLoginParams,
  UpdateAuthLtiLinkedLoginParams, 
  updateAuthLtiLinkedLoginSchema,
  insertAuthLtiLinkedLoginSchema, 
  authLtiLinkedLogins,
  authLtiLinkedLoginIdSchema 
} from "@/lib/db/schema/authLtiLinkedLogins";
import { getUserAuth } from "@/lib/auth/utils";

export const createAuthLtiLinkedLogin = async (authLtiLinkedLogin: NewAuthLtiLinkedLoginParams) => {
  const { session } = await getUserAuth();
  const newAuthLtiLinkedLogin = insertAuthLtiLinkedLoginSchema.parse({ ...authLtiLinkedLogin, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(authLtiLinkedLogins).values(newAuthLtiLinkedLogin).returning();
    return { authLtiLinkedLogin: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAuthLtiLinkedLogin = async (id: AuthLtiLinkedLoginId, authLtiLinkedLogin: UpdateAuthLtiLinkedLoginParams) => {
  const { session } = await getUserAuth();
  const { id: authLtiLinkedLoginId } = authLtiLinkedLoginIdSchema.parse({ id });
  const newAuthLtiLinkedLogin = updateAuthLtiLinkedLoginSchema.parse({ ...authLtiLinkedLogin, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(authLtiLinkedLogins)
     .set({...newAuthLtiLinkedLogin, updatedAt: new Date() })
     .where(and(eq(authLtiLinkedLogins.id, authLtiLinkedLoginId!), eq(authLtiLinkedLogins.userId, session?.user.id!)))
     .returning();
    return { authLtiLinkedLogin: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAuthLtiLinkedLogin = async (id: AuthLtiLinkedLoginId) => {
  const { session } = await getUserAuth();
  const { id: authLtiLinkedLoginId } = authLtiLinkedLoginIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(authLtiLinkedLogins).where(and(eq(authLtiLinkedLogins.id, authLtiLinkedLoginId!), eq(authLtiLinkedLogins.userId, session?.user.id!)))
    .returning();
    return { authLtiLinkedLogin: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

