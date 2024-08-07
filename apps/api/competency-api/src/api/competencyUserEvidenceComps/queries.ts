import type { CompetencyUserEvidenceCompId } from "@soco/competency-db/schema/competencyUserEvidenceComps";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import { competencies } from "@soco/competency-db/schema/competencies";
import {
  competencyUserEvidenceCompIdSchema,
  competencyUserEvidenceComps,
} from "@soco/competency-db/schema/competencyUserEvidenceComps";
import { competencyUserEvidences } from "@soco/competency-db/schema/competencyUserEvidences";

export const getCompetencyUserEvidenceComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyUserEvidenceComp: competencyUserEvidenceComps,
      competency: competencies,
      competencyUserEvidence: competencyUserEvidences,
    })
    .from(competencyUserEvidenceComps)
    .leftJoin(
      competencies,
      eq(competencyUserEvidenceComps.competencyId, competencies.id),
    )
    .leftJoin(
      competencyUserEvidences,
      eq(
        competencyUserEvidenceComps.competencyUserEvidenceId,
        competencyUserEvidences.id,
      ),
    )
    .where(eq(competencyUserEvidenceComps.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyUserEvidenceComp,
    competency: r.competency,
    competencyUserEvidence: r.competencyUserEvidence,
  }));
  return { competencyUserEvidenceComps: c };
};

export const getCompetencyUserEvidenceCompById = async (
  id: CompetencyUserEvidenceCompId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserEvidenceCompId } =
    competencyUserEvidenceCompIdSchema.parse({ id });
  const [row] = await db
    .select({
      competencyUserEvidenceComp: competencyUserEvidenceComps,
      competency: competencies,
      competencyUserEvidence: competencyUserEvidences,
    })
    .from(competencyUserEvidenceComps)
    .where(
      and(
        eq(competencyUserEvidenceComps.id, competencyUserEvidenceCompId),
        eq(competencyUserEvidenceComps.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencies,
      eq(competencyUserEvidenceComps.competencyId, competencies.id),
    )
    .leftJoin(
      competencyUserEvidences,
      eq(
        competencyUserEvidenceComps.competencyUserEvidenceId,
        competencyUserEvidences.id,
      ),
    );
  if (row === undefined) return {};
  const c = {
    ...row.competencyUserEvidenceComp,
    competency: row.competency,
    competencyUserEvidence: row.competencyUserEvidence,
  };
  return { competencyUserEvidenceComp: c };
};
