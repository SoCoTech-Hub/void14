import type { CompetencyFrameworkId } from "@soco/competency-db/schema/competencyFramework";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import {
  competencyFramework,
  competencyFrameworkIdSchema,
} from "@soco/competency-db/schema/competencyFramework";

export const getCompetencyFrameworks = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(competencyFramework)
    .where(eq(competencyFramework.userId, session?.user.id!));
  const c = rows;
  return { competencyFramework: c };
};

export const getCompetencyFrameworkById = async (id: CompetencyFrameworkId) => {
  const { session } = await getUserAuth();
  const { id: competencyFrameworkId } = competencyFrameworkIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(competencyFramework)
    .where(
      and(
        eq(competencyFramework.id, competencyFrameworkId),
        eq(competencyFramework.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const c = row;
  return { competencyFramework: c };
};
