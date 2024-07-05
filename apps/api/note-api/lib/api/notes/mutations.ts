import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertNoteSchema,
  NewNoteParams,
  NoteId,
  noteIdSchema,
  notes,
  UpdateNoteParams,
  updateNoteSchema,
} from "../../db/schema/notes";

export const createNote = async (note: NewNoteParams) => {
  const { session } = await getUserAuth();
  const newNote = insertNoteSchema.parse({
    ...note,
    userId: session?.user.id!,
  });
  try {
    const [n] = await db.insert(notes).values(newNote).returning();
    return { note: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateNote = async (id: NoteId, note: UpdateNoteParams) => {
  const { session } = await getUserAuth();
  const { id: noteId } = noteIdSchema.parse({ id });
  const newNote = updateNoteSchema.parse({
    ...note,
    userId: session?.user.id!,
  });
  try {
    const [n] = await db
      .update(notes)
      .set({ ...newNote, updatedAt: new Date() })
      .where(and(eq(notes.id, noteId!), eq(notes.userId, session?.user.id!)))
      .returning();
    return { note: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteNote = async (id: NoteId) => {
  const { session } = await getUserAuth();
  const { id: noteId } = noteIdSchema.parse({ id });
  try {
    const [n] = await db
      .delete(notes)
      .where(and(eq(notes.id, noteId!), eq(notes.userId, session?.user.id!)))
      .returning();
    return { note: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
