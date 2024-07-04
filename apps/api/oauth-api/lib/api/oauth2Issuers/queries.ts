import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type Oauth2IssuerId, oauth2IssuerIdSchema, oauth2Issuers } from "@/lib/db/schema/oauth2Issuers";

export const getOauth2Issuers = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(oauth2Issuers).where(eq(oauth2Issuers.userId, session?.user.id!));
  const o = rows
  return { oauth2Issuers: o };
};

export const getOauth2IssuerById = async (id: Oauth2IssuerId) => {
  const { session } = await getUserAuth();
  const { id: oauth2IssuerId } = oauth2IssuerIdSchema.parse({ id });
  const [row] = await db.select().from(oauth2Issuers).where(and(eq(oauth2Issuers.id, oauth2IssuerId), eq(oauth2Issuers.userId, session?.user.id!)));
  if (row === undefined) return {};
  const o = row;
  return { oauth2Issuer: o };
};


