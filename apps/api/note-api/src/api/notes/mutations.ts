import type {
  NewNoteParams,
  NoteId,
  UpdateNoteParams,
} from "@soco/note-db/schema/notes";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/note-db";
import { db } from "@soco/note-db/client";
import {
  insertNoteSchema,
  noteIdSchema,
  notes,
  updateNoteSchema,
} from "@soco/note-db/schema/notes";

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
