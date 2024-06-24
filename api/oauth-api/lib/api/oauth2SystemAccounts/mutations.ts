import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  Oauth2SystemAccountId, 
  NewOauth2SystemAccountParams,
  UpdateOauth2SystemAccountParams, 
  updateOauth2SystemAccountSchema,
  insertOauth2SystemAccountSchema, 
  oauth2SystemAccounts,
  oauth2SystemAccountIdSchema 
} from "@/lib/db/schema/oauth2SystemAccounts";
import { getUserAuth } from "@/lib/auth/utils";

export const createOauth2SystemAccount = async (oauth2SystemAccount: NewOauth2SystemAccountParams) => {
  const { session } = await getUserAuth();
  const newOauth2SystemAccount = insertOauth2SystemAccountSchema.parse({ ...oauth2SystemAccount, userId: session?.user.id! });
  try {
    const [o] =  await db.insert(oauth2SystemAccounts).values(newOauth2SystemAccount).returning();
    return { oauth2SystemAccount: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2SystemAccount = async (id: Oauth2SystemAccountId, oauth2SystemAccount: UpdateOauth2SystemAccountParams) => {
  const { session } = await getUserAuth();
  const { id: oauth2SystemAccountId } = oauth2SystemAccountIdSchema.parse({ id });
  const newOauth2SystemAccount = updateOauth2SystemAccountSchema.parse({ ...oauth2SystemAccount, userId: session?.user.id! });
  try {
    const [o] =  await db
     .update(oauth2SystemAccounts)
     .set({...newOauth2SystemAccount, updatedAt: new Date() })
     .where(and(eq(oauth2SystemAccounts.id, oauth2SystemAccountId!), eq(oauth2SystemAccounts.userId, session?.user.id!)))
     .returning();
    return { oauth2SystemAccount: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOauth2SystemAccount = async (id: Oauth2SystemAccountId) => {
  const { session } = await getUserAuth();
  const { id: oauth2SystemAccountId } = oauth2SystemAccountIdSchema.parse({ id });
  try {
    const [o] =  await db.delete(oauth2SystemAccounts).where(and(eq(oauth2SystemAccounts.id, oauth2SystemAccountId!), eq(oauth2SystemAccounts.userId, session?.user.id!)))
    .returning();
    return { oauth2SystemAccount: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

