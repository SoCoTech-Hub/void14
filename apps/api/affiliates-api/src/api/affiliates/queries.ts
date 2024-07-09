import type { AffiliateId } from "@soco/affiliates-db/schema/affiliates";
import { and, db, eq } from "@soco/affiliates-db";
import {
  affiliateIdSchema,
  affiliates,
} from "@soco/affiliates-db/schema/affiliates";
import { getUserAuth } from "@soco/auth-services";

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
