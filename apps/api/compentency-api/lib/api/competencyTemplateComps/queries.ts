import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CompetencyTemplateCompId } from "../db/schema/competencyTemplateComps";
import { db } from "../db/index";
import { competencies } from "../db/schema/competencies";
import {
  competencyTemplateCompIdSchema,
  competencyTemplateComps,
} from "../db/schema/competencyTemplateComps";
import { competencyTemplates } from "../db/schema/competencyTemplates";

export const getCompetencyTemplateComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyTemplateComp: competencyTemplateComps,
      competency: competencies,
      competencyTemplate: competencyTemplates,
    })
    .from(competencyTemplateComps)
    .leftJoin(
      competencies,
      eq(competencyTemplateComps.competencyId, competencies.id),
    )
    .leftJoin(
      competencyTemplates,
      eq(competencyTemplateComps.competencyTemplateId, competencyTemplates.id),
    )
    .where(eq(competencyTemplateComps.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyTemplateComp,
    competency: r.competency,
    competencyTemplate: r.competencyTemplate,
  }));
  return { competencyTemplateComps: c };
};

export const getCompetencyTemplateCompById = async (
  id: CompetencyTemplateCompId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateCompId } = competencyTemplateCompIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select({
      competencyTemplateComp: competencyTemplateComps,
      competency: competencies,
      competencyTemplate: competencyTemplates,
    })
    .from(competencyTemplateComps)
    .where(
      and(
        eq(competencyTemplateComps.id, competencyTemplateCompId),
        eq(competencyTemplateComps.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencies,
      eq(competencyTemplateComps.competencyId, competencies.id),
    )
    .leftJoin(
      competencyTemplates,
      eq(competencyTemplateComps.competencyTemplateId, competencyTemplates.id),
    );
  if (row === undefined) return {};
  const c = {
    ...row.competencyTemplateComp,
    competency: row.competency,
    competencyTemplate: row.competencyTemplate,
  };
  return { competencyTemplateComp: c };
};
