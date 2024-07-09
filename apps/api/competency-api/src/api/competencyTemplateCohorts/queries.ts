import { and, eq } from "drizzle-orm";

import type { CompetencyTemplateCohortId } from "@soco/competency-db/schema/competencyTemplateCohorts";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/competency-db/index";
import {
  competencyTemplateCohortIdSchema,
  competencyTemplateCohorts,
} from "@soco/competency-db/schema/competencyTemplateCohorts";
import { competencyTemplates } from "@soco/competency-db/schema/competencyTemplates";

export const getCompetencyTemplateCohorts = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyTemplateCohort: competencyTemplateCohorts,
      competencyTemplate: competencyTemplates,
    })
    .from(competencyTemplateCohorts)
    .leftJoin(
      competencyTemplates,
      eq(
        competencyTemplateCohorts.competencyTemplateId,
        competencyTemplates.id,
      ),
    )
    .where(eq(competencyTemplateCohorts.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyTemplateCohort,
    competencyTemplate: r.competencyTemplate,
  }));
  return { competencyTemplateCohorts: c };
};

export const getCompetencyTemplateCohortById = async (
  id: CompetencyTemplateCohortId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateCohortId } =
    competencyTemplateCohortIdSchema.parse({ id });
  const [row] = await db
    .select({
      competencyTemplateCohort: competencyTemplateCohorts,
      competencyTemplate: competencyTemplates,
    })
    .from(competencyTemplateCohorts)
    .where(
      and(
        eq(competencyTemplateCohorts.id, competencyTemplateCohortId),
        eq(competencyTemplateCohorts.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencyTemplates,
      eq(
        competencyTemplateCohorts.competencyTemplateId,
        competencyTemplates.id,
      ),
    );
  if (row === undefined) return {};
  const c = {
    ...row.competencyTemplateCohort,
    competencyTemplate: row.competencyTemplate,
  };
  return { competencyTemplateCohort: c };
};