import { and, eq } from "drizzle-orm";

import type { QualificationsResponseId } from "@soco/qualifications-db/schema/qualificationsResponses";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/qualifications-db/index";
import { qualifications } from "@soco/qualifications-db/schema/qualifications";
import {
  qualificationsResponseIdSchema,
  qualificationsResponses,
} from "@soco/qualifications-db/schema/qualificationsResponses";

export const getQualificationsResponses = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      qualificationsResponse: qualificationsResponses,
      qualification: qualifications,
    })
    .from(qualificationsResponses)
    .leftJoin(
      qualifications,
      eq(qualificationsResponses.qualificationId, qualifications.id),
    )
    .where(eq(qualificationsResponses.userId, session?.user.id!));
  const q = rows.map((r) => ({
    ...r.qualificationsResponse,
    qualification: r.qualification,
  }));
  return { qualificationsResponses: q };
};

export const getQualificationsResponseById = async (
  id: QualificationsResponseId,
) => {
  const { session } = await getUserAuth();
  const { id: qualificationsResponseId } = qualificationsResponseIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select({
      qualificationsResponse: qualificationsResponses,
      qualification: qualifications,
    })
    .from(qualificationsResponses)
    .where(
      and(
        eq(qualificationsResponses.id, qualificationsResponseId),
        eq(qualificationsResponses.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      qualifications,
      eq(qualificationsResponses.qualificationId, qualifications.id),
    );
  if (row === undefined) return {};
  const q = { ...row.qualificationsResponse, qualification: row.qualification };
  return { qualificationsResponse: q };
};
