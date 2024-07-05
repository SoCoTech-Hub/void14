import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { NoteId } from "../../db/schema/notes";
import { db } from "../../db/index";
import { noteIdSchema, notes } from "../../db/schema/notes";

export const getNotes = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, session?.user.id!));
  const n = rows;
  return { notes: n };
};

export const getNoteById = async (id: NoteId) => {
  const { session } = await getUserAuth();
  const { id: noteId } = noteIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(notes)
    .where(and(eq(notes.id, noteId), eq(notes.userId, session?.user.id!)));
  if (row === undefined) return {};
  const n = row;
  return { note: n };
};
