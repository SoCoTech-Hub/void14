import type { CompetencyFrameworkId } from "@soco/competency-db/schema/competencyFrameworks";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/competency-db";
import {
  competencyFrameworkIdSchema,
  competencyFrameworks,
} from "@soco/competency-db/schema/competencyFrameworks";

export const getCompetencyFrameworks = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(competencyFrameworks)
    .where(eq(competencyFrameworks.userId, session?.user.id!));
  const c = rows;
  return { competencyFrameworks: c };
};

export const getCompetencyFrameworkById = async (id: CompetencyFrameworkId) => {
  const { session } = await getUserAuth();
  const { id: competencyFrameworkId } = competencyFrameworkIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(competencyFrameworks)
    .where(
      and(
        eq(competencyFrameworks.id, competencyFrameworkId),
        eq(competencyFrameworks.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const c = row;
  return { competencyFramework: c };
};
