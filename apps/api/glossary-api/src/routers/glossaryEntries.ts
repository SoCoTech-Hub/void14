import { getGlossaryEntryById, getGlossaryEntries } from "../api/glossaryEntries/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  glossaryEntryIdSchema,
  insertGlossaryEntryParams,
  updateGlossaryEntryParams,
} from "@soco/glossary-db/schema/glossaryEntries";
import { createGlossaryEntry, deleteGlossaryEntry, updateGlossaryEntry } from "../api/glossaryEntries/mutations";

export const glossaryEntriesRouter =createTRPCRouter({
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
