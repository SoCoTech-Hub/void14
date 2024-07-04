import {
  createGlossaryEntry,
  deleteGlossaryEntry,
  updateGlossaryEntry,
} from "../api/glossaryEntries/mutations";
import {
  getGlossaryEntries,
  getGlossaryEntryById,
} from "../api/glossaryEntries/queries";
import {
  glossaryEntryIdSchema,
  insertGlossaryEntryParams,
  updateGlossaryEntryParams,
} from "../db/schema/glossaryEntries";
import { publicProcedure, router } from "../server/trpc";

export const glossaryEntriesRouter = router({
  getGlossaryEntries: publicProcedure.query(async () => {
    return getGlossaryEntries();
  }),
  getGlossaryEntryById: publicProcedure
    .input(glossaryEntryIdSchema)
    .query(async ({ input }) => {
      return getGlossaryEntryById(input.id);
    }),
  createGlossaryEntry: publicProcedure
    .input(insertGlossaryEntryParams)
    .mutation(async ({ input }) => {
      return createGlossaryEntry(input);
    }),
  updateGlossaryEntry: publicProcedure
    .input(updateGlossaryEntryParams)
    .mutation(async ({ input }) => {
      return updateGlossaryEntry(input.id, input);
    }),
  deleteGlossaryEntry: publicProcedure
    .input(glossaryEntryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGlossaryEntry(input.id);
    }),
});
