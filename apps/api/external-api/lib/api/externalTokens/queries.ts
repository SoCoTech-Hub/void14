import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ExternalTokenId } from "../../db/schema/externalTokens";
import { db } from "../../db/index";
import {
  externalTokenIdSchema,
  externalTokens,
} from "../../db/schema/externalTokens";

export const getExternalTokens = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(externalTokens)
    .where(eq(externalTokens.userId, session?.user.id!));
  const e = rows;
  return { externalTokens: e };
};

export const getExternalTokenById = async (id: ExternalTokenId) => {
  const { session } = await getUserAuth();
  const { id: externalTokenId } = externalTokenIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(externalTokens)
    .where(
      and(
        eq(externalTokens.id, externalTokenId),
        eq(externalTokens.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const e = row;
  return { externalToken: e };
};
