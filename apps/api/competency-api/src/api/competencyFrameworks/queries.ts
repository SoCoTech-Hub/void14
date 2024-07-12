import { db } from "@soco/competency-db/client";
import { eq, and } from "@soco/competency-db";
import { getUserAuth } from "@soco/auth-service";
import { type CompetencyFrameworkId, competencyFrameworkIdSchema, competencyFrameworks } from "@soco/competency-db/schema/competencyFrameworks";

export const getCompetencyFrameworks = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(competencyFrameworks).where(eq(competencyFrameworks.userId, session?.user.id!));
  const c = rows
  return { competencyFrameworks: c };
};

export const getCompetencyFrameworkById = async (id: CompetencyFrameworkId) => {
  const { session } = await getUserAuth();
  const { id: competencyFrameworkId } = competencyFrameworkIdSchema.parse({ id });
  const [row] = await db.select().from(competencyFrameworks).where(and(eq(competencyFrameworks.id, competencyFrameworkId), eq(competencyFrameworks.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { competencyFramework: c };
};


