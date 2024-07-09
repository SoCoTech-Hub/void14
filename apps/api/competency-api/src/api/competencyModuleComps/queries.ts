import type { CompetencyModuleCompId } from "@soco/competency-db/schema/competencyModuleComps";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/competency-db";
import { competencies } from "@soco/competency-db/schema/competencies";
import {
  competencyModuleCompIdSchema,
  competencyModuleComps,
} from "@soco/competency-db/schema/competencyModuleComps";

export const getCompetencyModuleComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyModuleComp: competencyModuleComps,
      competency: competencies,
    })
    .from(competencyModuleComps)
    .leftJoin(
      competencies,
      eq(competencyModuleComps.competencyId, competencies.id),
    )
    .where(eq(competencyModuleComps.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyModuleComp,
    competency: r.competency,
  }));
  return { competencyModuleComps: c };
};

export const getCompetencyModuleCompById = async (
  id: CompetencyModuleCompId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyModuleCompId } = competencyModuleCompIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      competencyModuleComp: competencyModuleComps,
      competency: competencies,
    })
    .from(competencyModuleComps)
    .where(
      and(
        eq(competencyModuleComps.id, competencyModuleCompId),
        eq(competencyModuleComps.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencies,
      eq(competencyModuleComps.competencyId, competencies.id),
    );
  if (row === undefined) return {};
  const c = { ...row.competencyModuleComp, competency: row.competency };
  return { competencyModuleComp: c };
};
