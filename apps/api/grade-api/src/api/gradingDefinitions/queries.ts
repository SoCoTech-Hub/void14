import { db } from "@soco/grade-db/client";
import { eq, and } from "@soco/grade-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type GradingDefinitionId, gradingDefinitionIdSchema, gradingDefinitions } from "@soco/grade-db/schema/gradingDefinitions";

export const getGradingDefinitions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(gradingDefinitions).where(eq(gradingDefinitions.userId, session?.user.id!));
  const g = rows
  return { gradingDefinitions: g };
};

export const getGradingDefinitionById = async (id: GradingDefinitionId) => {
  const { session } = await getUserAuth();
  const { id: gradingDefinitionId } = gradingDefinitionIdSchema.parse({ id });
  const [row] = await db.select().from(gradingDefinitions).where(and(eq(gradingDefinitions.id, gradingDefinitionId), eq(gradingDefinitions.userId, session?.user.id!)));
  if (row === undefined) return {};
  const g = row;
  return { gradingDefinition: g };
};


