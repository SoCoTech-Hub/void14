import { and, eq } from "drizzle-orm";

import type { CompetencyTemplateId } from "@soco/competency-db/schema/competencyTemplates";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/competency-db/index";
import {
  competencyTemplateIdSchema,
  competencyTemplates,
} from "@soco/competency-db/schema/competencyTemplates";

export const getCompetencyTemplates = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(competencyTemplates)
    .where(eq(competencyTemplates.userId, session?.user.id!));
  const c = rows;
  return { competencyTemplates: c };
};

export const getCompetencyTemplateById = async (id: CompetencyTemplateId) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateId } = competencyTemplateIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(competencyTemplates)
    .where(
      and(
        eq(competencyTemplates.id, competencyTemplateId),
        eq(competencyTemplates.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const c = row;
  return { competencyTemplate: c };
};
