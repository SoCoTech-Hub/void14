import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/editor-db/index";
import {
  EditorAttoAutosaveId,
  editorAttoAutosaveIdSchema,
  editorAttoAutosaves,
  insertEditorAttoAutosaveSchema,
  NewEditorAttoAutosaveParams,
  UpdateEditorAttoAutosaveParams,
  updateEditorAttoAutosaveSchema,
} from "@soco/editor-db/schema/editorAttoAutosaves";

export const createEditorAttoAutosave = async (
  editorAttoAutosave: NewEditorAttoAutosaveParams,
) => {
  const { session } = await getUserAuth();
  const newEditorAttoAutosave = insertEditorAttoAutosaveSchema.parse({
    ...editorAttoAutosave,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .insert(editorAttoAutosaves)
      .values(newEditorAttoAutosave)
      .returning();
    return { editorAttoAutosave: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEditorAttoAutosave = async (
  id: EditorAttoAutosaveId,
  editorAttoAutosave: UpdateEditorAttoAutosaveParams,
) => {
  const { session } = await getUserAuth();
  const { id: editorAttoAutosaveId } = editorAttoAutosaveIdSchema.parse({ id });
  const newEditorAttoAutosave = updateEditorAttoAutosaveSchema.parse({
    ...editorAttoAutosave,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(editorAttoAutosaves)
      .set({ ...newEditorAttoAutosave, updatedAt: new Date() })
      .where(
        and(
          eq(editorAttoAutosaves.id, editorAttoAutosaveId!),
          eq(editorAttoAutosaves.userId, session?.user.id!),
        ),
      )
      .returning();
    return { editorAttoAutosave: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEditorAttoAutosave = async (id: EditorAttoAutosaveId) => {
  const { session } = await getUserAuth();
  const { id: editorAttoAutosaveId } = editorAttoAutosaveIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(editorAttoAutosaves)
      .where(
        and(
          eq(editorAttoAutosaves.id, editorAttoAutosaveId!),
          eq(editorAttoAutosaves.userId, session?.user.id!),
        ),
      )
      .returning();
    return { editorAttoAutosave: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};