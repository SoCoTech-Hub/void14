import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type LtiAccessTokenId, ltiAccessTokenIdSchema, ltiAccessTokens } from "@/lib/db/schema/ltiAccessTokens";

export const getLtiAccessTokens = async () => {
  const rows = await db.select().from(ltiAccessTokens);
  const l = rows
  return { ltiAccessTokens: l };
};

export const getLtiAccessTokenById = async (id: LtiAccessTokenId) => {
  const { id: ltiAccessTokenId } = ltiAccessTokenIdSchema.parse({ id });
  const [row] = await db.select().from(ltiAccessTokens).where(eq(ltiAccessTokens.id, ltiAccessTokenId));
  if (row === undefined) return {};
  const l = row;
  return { ltiAccessToken: l };
};


