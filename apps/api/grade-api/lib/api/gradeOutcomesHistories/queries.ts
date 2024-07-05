import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { GradeOutcomesHistoryId } from "../../db/schema/gradeOutcomesHistories";
import { db } from "../../db/index";
import {
  gradeOutcomesHistories,
  gradeOutcomesHistoryIdSchema,
} from "../../db/schema/gradeOutcomesHistories";

export const getGradeOutcomesHistories = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(gradeOutcomesHistories)
    .where(eq(gradeOutcomesHistories.userId, session?.user.id!));
  const g = rows;
  return { gradeOutcomesHistories: g };
};

export const getGradeOutcomesHistoryById = async (
  id: GradeOutcomesHistoryId,
) => {
  const { session } = await getUserAuth();
  const { id: gradeOutcomesHistoryId } = gradeOutcomesHistoryIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(gradeOutcomesHistories)
    .where(
      and(
        eq(gradeOutcomesHistories.id, gradeOutcomesHistoryId),
        eq(gradeOutcomesHistories.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const g = row;
  return { gradeOutcomesHistory: g };
};
