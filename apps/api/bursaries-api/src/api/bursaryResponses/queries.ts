import type { BursaryResponseId } from "@soco/bursaries-db/schema/bursaryResponses";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/bursaries-db";
import { db } from "@soco/bursaries-db/client";
import { bursaries } from "@soco/bursaries-db/schema/bursaries";
import {
  bursaryResponseIdSchema,
  bursaryResponses,
} from "@soco/bursaries-db/schema/bursaryResponses";

export const getBursaryResponses = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ bursaryResponse: bursaryResponses, bursary: bursaries })
    .from(bursaryResponses)
    .leftJoin(bursaries, eq(bursaryResponses.bursaryId, bursaries.id))
    .where(eq(bursaryResponses.userId, session?.user.id!));
  const b = rows.map((r) => ({ ...r.bursaryResponse, bursary: r.bursary }));
  return { bursaryResponses: b };
};

export const getBursaryResponseById = async (id: BursaryResponseId) => {
  const { session } = await getUserAuth();
  const { id: bursaryResponseId } = bursaryResponseIdSchema.parse({ id });
  const [row] = await db
    .select({ bursaryResponse: bursaryResponses, bursary: bursaries })
    .from(bursaryResponses)
    .where(
      and(
        eq(bursaryResponses.id, bursaryResponseId),
        eq(bursaryResponses.userId, session?.user.id!),
      ),
    )
    .leftJoin(bursaries, eq(bursaryResponses.bursaryId, bursaries.id));
  if (row === undefined) return {};
  const b = { ...row.bursaryResponse, bursary: row.bursary };
  return { bursaryResponse: b };
};
