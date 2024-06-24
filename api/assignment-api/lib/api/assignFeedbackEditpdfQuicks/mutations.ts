import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  AssignFeedbackEditpdfQuickId, 
  NewAssignFeedbackEditpdfQuickParams,
  UpdateAssignFeedbackEditpdfQuickParams, 
  updateAssignFeedbackEditpdfQuickSchema,
  insertAssignFeedbackEditpdfQuickSchema, 
  assignFeedbackEditpdfQuicks,
  assignFeedbackEditpdfQuickIdSchema 
} from "@/lib/db/schema/assignFeedbackEditpdfQuicks";
import { getUserAuth } from "@/lib/auth/utils";

export const createAssignFeedbackEditpdfQuick = async (assignFeedbackEditpdfQuick: NewAssignFeedbackEditpdfQuickParams) => {
  const { session } = await getUserAuth();
  const newAssignFeedbackEditpdfQuick = insertAssignFeedbackEditpdfQuickSchema.parse({ ...assignFeedbackEditpdfQuick, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(assignFeedbackEditpdfQuicks).values(newAssignFeedbackEditpdfQuick).returning();
    return { assignFeedbackEditpdfQuick: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignFeedbackEditpdfQuick = async (id: AssignFeedbackEditpdfQuickId, assignFeedbackEditpdfQuick: UpdateAssignFeedbackEditpdfQuickParams) => {
  const { session } = await getUserAuth();
  const { id: assignFeedbackEditpdfQuickId } = assignFeedbackEditpdfQuickIdSchema.parse({ id });
  const newAssignFeedbackEditpdfQuick = updateAssignFeedbackEditpdfQuickSchema.parse({ ...assignFeedbackEditpdfQuick, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(assignFeedbackEditpdfQuicks)
     .set(newAssignFeedbackEditpdfQuick)
     .where(and(eq(assignFeedbackEditpdfQuicks.id, assignFeedbackEditpdfQuickId!), eq(assignFeedbackEditpdfQuicks.userId, session?.user.id!)))
     .returning();
    return { assignFeedbackEditpdfQuick: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignFeedbackEditpdfQuick = async (id: AssignFeedbackEditpdfQuickId) => {
  const { session } = await getUserAuth();
  const { id: assignFeedbackEditpdfQuickId } = assignFeedbackEditpdfQuickIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(assignFeedbackEditpdfQuicks).where(and(eq(assignFeedbackEditpdfQuicks.id, assignFeedbackEditpdfQuickId!), eq(assignFeedbackEditpdfQuicks.userId, session?.user.id!)))
    .returning();
    return { assignFeedbackEditpdfQuick: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

