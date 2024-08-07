import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type Oauth2SystemAccountId, oauth2SystemAccountIdSchema, oauth2SystemAccounts } from "@/lib/db/schema/oauth2SystemAccounts";
import { oauth2issuers } from "@/lib/db/schema/oauth2issuers";

export const getOauth2SystemAccounts = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ oauth2SystemAccount: oauth2SystemAccounts, oauth2issuer: oauth2issuers }).from(oauth2SystemAccounts).leftJoin(oauth2issuers, eq(oauth2SystemAccounts.oauth2issuerId, oauth2issuers.id)).where(eq(oauth2SystemAccounts.userId, session?.user.id!));
  const o = rows .map((r) => ({ ...r.oauth2SystemAccount, oauth2issuer: r.oauth2issuer})); 
  return { oauth2SystemAccounts: o };
};

export const getOauth2SystemAccountById = async (id: Oauth2SystemAccountId) => {
  const { session } = await getUserAuth();
  const { id: oauth2SystemAccountId } = oauth2SystemAccountIdSchema.parse({ id });
  const [row] = await db.select({ oauth2SystemAccount: oauth2SystemAccounts, oauth2issuer: oauth2issuers }).from(oauth2SystemAccounts).where(and(eq(oauth2SystemAccounts.id, oauth2SystemAccountId), eq(oauth2SystemAccounts.userId, session?.user.id!))).leftJoin(oauth2issuers, eq(oauth2SystemAccounts.oauth2issuerId, oauth2issuers.id));
  if (row === undefined) return {};
  const o =  { ...row.oauth2SystemAccount, oauth2issuer: row.oauth2issuer } ;
  return { oauth2SystemAccount: o };
};


