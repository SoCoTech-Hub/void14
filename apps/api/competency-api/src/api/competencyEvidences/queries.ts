import type { CompetencyEvidenceId } from "@soco/competency-db/schema/competencyEvidences";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/competency-db";
import {
  competencyEvidenceIdSchema,
  competencyEvidences,
} from "@soco/competency-db/schema/competencyEvidences";

export const getCompetencyEvidences = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(competencyEvidences)
    .where(eq(competencyEvidences.userId, session?.user.id!));
  const c = rows;
  return { competencyEvidences: c };
};

export const getCompetencyEvidenceById = async (id: CompetencyEvidenceId) => {
  const { session } = await getUserAuth();
  const { id: competencyEvidenceId } = competencyEvidenceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(competencyEvidences)
    .where(
      and(
        eq(competencyEvidences.id, competencyEvidenceId),
        eq(competencyEvidences.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const c = row;
  return { competencyEvidence: c };
};
