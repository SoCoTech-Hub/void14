import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type CompetencyFrameworkId, competencyFrameworkIdSchema, competencyFrameworks } from "@/lib/db/schema/competencyFrameworks";

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


