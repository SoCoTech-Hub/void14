import { db } from "@soco/oauth2-db/client";
import { eq, and } from "@soco/oauth2-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type Oauth2AccessTokenId, oauth2AccessTokenIdSchema, oauth2AccessTokens } from "@soco/oauth2-db/schema/oauth2AccessTokens";
import { oauth2issuers } from "@soco/oauth2-db/schema/oauth2issuers";

export const getOauth2AccessTokens = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ oauth2AccessToken: oauth2AccessTokens, oauth2issuer: oauth2issuers }).from(oauth2AccessTokens).leftJoin(oauth2issuers, eq(oauth2AccessTokens.oauth2issuerId, oauth2issuers.id)).where(eq(oauth2AccessTokens.userId, session?.user.id!));
  const o = rows .map((r) => ({ ...r.oauth2AccessToken, oauth2issuer: r.oauth2issuer})); 
  return { oauth2AccessTokens: o };
};

export const getOauth2AccessTokenById = async (id: Oauth2AccessTokenId) => {
  const { session } = await getUserAuth();
  const { id: oauth2AccessTokenId } = oauth2AccessTokenIdSchema.parse({ id });
  const [row] = await db.select({ oauth2AccessToken: oauth2AccessTokens, oauth2issuer: oauth2issuers }).from(oauth2AccessTokens).where(and(eq(oauth2AccessTokens.id, oauth2AccessTokenId), eq(oauth2AccessTokens.userId, session?.user.id!))).leftJoin(oauth2issuers, eq(oauth2AccessTokens.oauth2issuerId, oauth2issuers.id));
  if (row === undefined) return {};
  const o =  { ...row.oauth2AccessToken, oauth2issuer: row.oauth2issuer } ;
  return { oauth2AccessToken: o };
};


