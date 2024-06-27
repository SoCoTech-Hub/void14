import { getGlossaryEntryById, getGlossaryEntries } from "@/lib/api/glossaryEntries/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  glossaryEntryIdSchema,
  insertGlossaryEntryParams,
  updateGlossaryEntryParams,
} from "@/lib/db/schema/glossaryEntries";
import { createGlossaryEntry, deleteGlossaryEntry, updateGlossaryEntry } from "@/lib/api/glossaryEntries/mutations";

export const glossaryEntriesRouter = router({
  getGlossaryEntries: publicProcedure.query(async () => {
    return getGlossaryEntries();
  }),
  getGlossaryEntryById: publicProcedure.input(glossaryEntryIdSchema).query(async ({ input }) => {
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
