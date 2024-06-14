import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type GradeItemsHistoryId, gradeItemsHistoryIdSchema, gradeItemsHistories } from "@/lib/db/schema/gradeItemsHistories";

export const getGradeItemsHistories = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(gradeItemsHistories).where(eq(gradeItemsHistories.userId, session?.user.id!));
  const g = rows
  return { gradeItemsHistories: g };
};

export const getGradeItemsHistoryById = async (id: GradeItemsHistoryId) => {
  const { session } = await getUserAuth();
  const { id: gradeItemsHistoryId } = gradeItemsHistoryIdSchema.parse({ id });
  const [row] = await db.select().from(gradeItemsHistories).where(and(eq(gradeItemsHistories.id, gradeItemsHistoryId), eq(gradeItemsHistories.userId, session?.user.id!)));
  if (row === undefined) return {};
  const g = row;
  return { gradeItemsHistory: g };
};


