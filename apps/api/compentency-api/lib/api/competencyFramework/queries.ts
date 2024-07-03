import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type CompetencyFrameworkId, competencyFrameworkIdSchema, competencyFramework } from "@/lib/db/schema/competencyFramework";

export const getCompetencyFrameworks = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(competencyFramework).where(eq(competencyFramework.userId, session?.user.id!));
  const c = rows
  return { competencyFramework: c };
};

export const getCompetencyFrameworkById = async (id: CompetencyFrameworkId) => {
  const { session } = await getUserAuth();
  const { id: competencyFrameworkId } = competencyFrameworkIdSchema.parse({ id });
  const [row] = await db.select().from(competencyFramework).where(and(eq(competencyFramework.id, competencyFrameworkId), eq(competencyFramework.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { competencyFramework: c };
};


