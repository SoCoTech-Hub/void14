import type { CompetencyUserEvidenceId } from "@soco/competency-db/schema/competencyUserEvidences";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import {
  competencyUserEvidenceIdSchema,
  competencyUserEvidences,
} from "@soco/competency-db/schema/competencyUserEvidences";

export const getCompetencyUserEvidences = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(competencyUserEvidences)
    .where(eq(competencyUserEvidences.userId, session?.user.id!));
  const c = rows;
  return { competencyUserEvidences: c };
};

export const getCompetencyUserEvidenceById = async (
  id: CompetencyUserEvidenceId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserEvidenceId } = competencyUserEvidenceIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(competencyUserEvidences)
    .where(
      and(
        eq(competencyUserEvidences.id, competencyUserEvidenceId),
        eq(competencyUserEvidences.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const c = row;
  return { competencyUserEvidence: c };
};
