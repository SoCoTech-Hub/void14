import { and, eq } from "drizzle-orm";

import type { GradingDefinitionId } from "@soco/grade-db/schema/gradingDefinitions";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/grade-db/index";
import {
  gradingDefinitionIdSchema,
  gradingDefinitions,
} from "@soco/grade-db/schema/gradingDefinitions";

export const getGradingDefinitions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(gradingDefinitions)
    .where(eq(gradingDefinitions.userId, session?.user.id!));
  const g = rows;
  return { gradingDefinitions: g };
};

export const getGradingDefinitionById = async (id: GradingDefinitionId) => {
  const { session } = await getUserAuth();
  const { id: gradingDefinitionId } = gradingDefinitionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradingDefinitions)
    .where(
      and(
        eq(gradingDefinitions.id, gradingDefinitionId),
        eq(gradingDefinitions.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const g = row;
  return { gradingDefinition: g };
};
