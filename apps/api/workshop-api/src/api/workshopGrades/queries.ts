import { and, eq } from "drizzle-orm";

import type { WorkshopGradeId } from "@soco/workshop-db/schema/workshopGrades";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/workshop-db/index";
import {
  workshopGradeIdSchema,
  workshopGrades,
} from "@soco/workshop-db/schema/workshopGrades";

export const getWorkshopGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(workshopGrades)
    .where(eq(workshopGrades.userId, session?.user.id!));
  const w = rows;
  return { workshopGrades: w };
};

export const getWorkshopGradeById = async (id: WorkshopGradeId) => {
  const { session } = await getUserAuth();
  const { id: workshopGradeId } = workshopGradeIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(workshopGrades)
    .where(
      and(
        eq(workshopGrades.id, workshopGradeId),
        eq(workshopGrades.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const w = row;
  return { workshopGrade: w };
};
