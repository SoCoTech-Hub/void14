import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  AuthOauth2LinkedLoginId, 
  NewAuthOauth2LinkedLoginParams,
  UpdateAuthOauth2LinkedLoginParams, 
  updateAuthOauth2LinkedLoginSchema,
  insertAuthOauth2LinkedLoginSchema, 
  authOauth2LinkedLogins,
  authOauth2LinkedLoginIdSchema 
} from "@/lib/db/schema/authOauth2LinkedLogins";
import { getUserAuth } from "@/lib/auth/utils";

export const createAuthOauth2LinkedLogin = async (authOauth2LinkedLogin: NewAuthOauth2LinkedLoginParams) => {
  const { session } = await getUserAuth();
  const newAuthOauth2LinkedLogin = insertAuthOauth2LinkedLoginSchema.parse({ ...authOauth2LinkedLogin, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(authOauth2LinkedLogins).values(newAuthOauth2LinkedLogin).returning();
    return { authOauth2LinkedLogin: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAuthOauth2LinkedLogin = async (id: AuthOauth2LinkedLoginId, authOauth2LinkedLogin: UpdateAuthOauth2LinkedLoginParams) => {
  const { session } = await getUserAuth();
  const { id: authOauth2LinkedLoginId } = authOauth2LinkedLoginIdSchema.parse({ id });
  const newAuthOauth2LinkedLogin = updateAuthOauth2LinkedLoginSchema.parse({ ...authOauth2LinkedLogin, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(authOauth2LinkedLogins)
     .set({...newAuthOauth2LinkedLogin, updatedAt: new Date() })
     .where(and(eq(authOauth2LinkedLogins.id, authOauth2LinkedLoginId!), eq(authOauth2LinkedLogins.userId, session?.user.id!)))
     .returning();
    return { authOauth2LinkedLogin: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAuthOauth2LinkedLogin = async (id: AuthOauth2LinkedLoginId) => {
  const { session } = await getUserAuth();
  const { id: authOauth2LinkedLoginId } = authOauth2LinkedLoginIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(authOauth2LinkedLogins).where(and(eq(authOauth2LinkedLogins.id, authOauth2LinkedLoginId!), eq(authOauth2LinkedLogins.userId, session?.user.id!)))
    .returning();
    return { authOauth2LinkedLogin: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

