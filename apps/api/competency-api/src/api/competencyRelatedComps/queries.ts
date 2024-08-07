import type { CompetencyRelatedCompId } from "@soco/competency-db/schema/competencyRelatedComps";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import { competencies } from "@soco/competency-db/schema/competencies";
import {
  competencyRelatedCompIdSchema,
  competencyRelatedComps,
} from "@soco/competency-db/schema/competencyRelatedComps";

export const getCompetencyRelatedComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyRelatedComp: competencyRelatedComps,
      competency: competencies,
    })
    .from(competencyRelatedComps)
    .leftJoin(
      competencies,
      eq(competencyRelatedComps.competencyId, competencies.id),
    )
    .where(eq(competencyRelatedComps.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyRelatedComp,
    competency: r.competency,
  }));
  return { competencyRelatedComps: c };
};

export const getCompetencyRelatedCompById = async (
  id: CompetencyRelatedCompId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyRelatedCompId } = competencyRelatedCompIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      competencyRelatedComp: competencyRelatedComps,
      competency: competencies,
    })
    .from(competencyRelatedComps)
    .where(
      and(
        eq(competencyRelatedComps.id, competencyRelatedCompId),
        eq(competencyRelatedComps.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencies,
      eq(competencyRelatedComps.competencyId, competencies.id),
    );
  if (row === undefined) return {};
  const c = { ...row.competencyRelatedComp, competency: row.competency };
  return { competencyRelatedComp: c };
};
