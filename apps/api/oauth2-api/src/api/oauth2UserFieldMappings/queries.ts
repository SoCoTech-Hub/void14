import { db } from "@soco/oauth2-db/client";
import { eq, and } from "@soco/oauth2-db";
import { getUserAuth } from "@soco/auth-service";
import { type Oauth2UserFieldMappingId, oauth2UserFieldMappingIdSchema, oauth2UserFieldMappings } from "@soco/oauth2-db/schema/oauth2UserFieldMappings";
import { oauth2issuers } from "@soco/oauth2-db/schema/oauth2issuers";

export const getOauth2UserFieldMappings = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ oauth2UserFieldMapping: oauth2UserFieldMappings, oauth2issuer: oauth2issuers }).from(oauth2UserFieldMappings).leftJoin(oauth2issuers, eq(oauth2UserFieldMappings.oauth2issuerId, oauth2issuers.id)).where(eq(oauth2UserFieldMappings.userId, session?.user.id!));
  const o = rows .map((r) => ({ ...r.oauth2UserFieldMapping, oauth2issuer: r.oauth2issuer})); 
  return { oauth2UserFieldMappings: o };
};

export const getOauth2UserFieldMappingById = async (id: Oauth2UserFieldMappingId) => {
  const { session } = await getUserAuth();
  const { id: oauth2UserFieldMappingId } = oauth2UserFieldMappingIdSchema.parse({ id });
  const [row] = await db.select({ oauth2UserFieldMapping: oauth2UserFieldMappings, oauth2issuer: oauth2issuers }).from(oauth2UserFieldMappings).where(and(eq(oauth2UserFieldMappings.id, oauth2UserFieldMappingId), eq(oauth2UserFieldMappings.userId, session?.user.id!))).leftJoin(oauth2issuers, eq(oauth2UserFieldMappings.oauth2issuerId, oauth2issuers.id));
  if (row === undefined) return {};
  const o =  { ...row.oauth2UserFieldMapping, oauth2issuer: row.oauth2issuer } ;
  return { oauth2UserFieldMapping: o };
};


