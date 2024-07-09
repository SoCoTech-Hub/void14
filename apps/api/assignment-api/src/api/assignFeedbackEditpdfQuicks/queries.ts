import type { AssignFeedbackEditpdfQuickId } from "@soco/assignment-db/schema/assignFeedbackEditpdfQuicks";
import { and, db, eq } from "@soco/assignment-db";
import {
  assignFeedbackEditpdfQuickIdSchema,
  assignFeedbackEditpdfQuicks,
} from "@soco/assignment-db/schema/assignFeedbackEditpdfQuicks";
import { getUserAuth } from "@soco/auth-services";

export const getAssignFeedbackEditpdfQuicks = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(assignFeedbackEditpdfQuicks)
    .where(eq(assignFeedbackEditpdfQuicks.userId, session?.user.id!));
  const a = rows;
  return { assignFeedbackEditpdfQuicks: a };
};

export const getAssignFeedbackEditpdfQuickById = async (
  id: AssignFeedbackEditpdfQuickId,
) => {
  const { session } = await getUserAuth();
  const { id: assignFeedbackEditpdfQuickId } =
    assignFeedbackEditpdfQuickIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(assignFeedbackEditpdfQuicks)
    .where(
      and(
        eq(assignFeedbackEditpdfQuicks.id, assignFeedbackEditpdfQuickId),
        eq(assignFeedbackEditpdfQuicks.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const a = row;
  return { assignFeedbackEditpdfQuick: a };
};
