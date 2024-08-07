import type { EditorAttoAutosaveId } from "@soco/editor-db/schema/editorAttoAutosaves";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/editor-db";
import { db } from "@soco/editor-db/client";
import {
  editorAttoAutosaveIdSchema,
  editorAttoAutosaves,
} from "@soco/editor-db/schema/editorAttoAutosaves";

export const getEditorAttoAutosaves = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(editorAttoAutosaves)
    .where(eq(editorAttoAutosaves.userId, session?.user.id!));
  const e = rows;
  return { editorAttoAutosaves: e };
};

export const getEditorAttoAutosaveById = async (id: EditorAttoAutosaveId) => {
  const { session } = await getUserAuth();
  const { id: editorAttoAutosaveId } = editorAttoAutosaveIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(editorAttoAutosaves)
    .where(
      and(
        eq(editorAttoAutosaves.id, editorAttoAutosaveId),
        eq(editorAttoAutosaves.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const e = row;
  return { editorAttoAutosave: e };
};
