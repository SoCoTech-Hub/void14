import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CompetencyUserEvidenceId } from "../../db/schema/competencyUserEvidences";
import { db } from "../../db/index";
import {
  competencyUserEvidenceIdSchema,
  competencyUserEvidences,
} from "../../db/schema/competencyUserEvidences";

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
