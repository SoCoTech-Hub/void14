import { createNote, deleteNote, updateNote } from "../api/notes/mutations";
import { getNoteById, getNotes } from "../api/notes/queries";
import {
  insertNoteParams,
  noteIdSchema,
  updateNoteParams,
} from "../db/schema/notes";
import { publicProcedure, router } from "../server/trpc";

export const notesRouter = router({
  getNotes: publicProcedure.query(async () => {
    return getNotes();
  }),
  getNoteById: publicProcedure.input(noteIdSchema).query(async ({ input }) => {
    return getNoteById(input.id);
  }),
  createNote: publicProcedure
    .input(insertNoteParams)
    .mutation(async ({ input }) => {
      return createNote(input);
    }),
  updateNote: publicProcedure
    .input(updateNoteParams)
    .mutation(async ({ input }) => {
      return updateNote(input.id, input);
    }),
  deleteNote: publicProcedure
    .input(noteIdSchema)
    .mutation(async ({ input }) => {
      return deleteNote(input.id);
    }),
});
