import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { AffiliateId } from "../../db/schema/affiliates";
import { db } from "../../db/index";
import { affiliateIdSchema, affiliates } from "../../db/schema/affiliates";

export const getAffiliates = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(affiliates)
    .where(eq(affiliates.userId, session?.user.id!));
  const a = rows;
  return { affiliates: a };
};

export const getAffiliateById = async (id: AffiliateId) => {
  const { session } = await getUserAuth();
  const { id: affiliateId } = affiliateIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(affiliates)
    .where(
      and(
        eq(affiliates.id, affiliateId),
        eq(affiliates.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const a = row;
  return { affiliate: a };
};
