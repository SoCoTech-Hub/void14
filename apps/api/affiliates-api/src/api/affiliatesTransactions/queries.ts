import type { AffiliatesTransactionId } from "@soco/affiliates-db/schema/affiliatesTransactions";
import { eq } from "@soco/affiliates-db";
import { db } from "@soco/affiliates-db/client";
import { affiliates } from "@soco/affiliates-db/schema/affiliates";
import { affiliatesStatuses } from "@soco/affiliates-db/schema/affiliatesStatuses";
import {
  affiliatesTransactionIdSchema,
  affiliatesTransactions,
} from "@soco/affiliates-db/schema/affiliatesTransactions";

export const getAffiliatesTransactions = async () => {
  const rows = await db
    .select({
      affiliatesTransaction: affiliatesTransactions,
      affiliate: affiliates,
      affiliatesStatus: affiliatesStatuses,
    })
    .from(affiliatesTransactions)
    .leftJoin(affiliates, eq(affiliatesTransactions.affiliateId, affiliates.id))
    .leftJoin(
      affiliatesStatuses,
      eq(affiliatesTransactions.affiliatesStatusId, affiliatesStatuses.id),
    );
  const a = rows.map((r) => ({
    ...r.affiliatesTransaction,
    affiliate: r.affiliate,
    affiliatesStatus: r.affiliatesStatus,
  }));
  return { affiliatesTransactions: a };
};

export const getAffiliatesTransactionById = async (
  id: AffiliatesTransactionId,
) => {
  const { id: affiliatesTransactionId } = affiliatesTransactionIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      affiliatesTransaction: affiliatesTransactions,
      affiliate: affiliates,
      affiliatesStatus: affiliatesStatuses,
    })
    .from(affiliatesTransactions)
    .where(eq(affiliatesTransactions.id, affiliatesTransactionId))
    .leftJoin(affiliates, eq(affiliatesTransactions.affiliateId, affiliates.id))
    .leftJoin(
      affiliatesStatuses,
      eq(affiliatesTransactions.affiliatesStatusId, affiliatesStatuses.id),
    );
  if (row === undefined) return {};
  const a = {
    ...row.affiliatesTransaction,
    affiliate: row.affiliate,
    affiliatesStatus: row.affiliatesStatus,
  };
  return { affiliatesTransaction: a };
};
