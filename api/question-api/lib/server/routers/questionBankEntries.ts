import { getQuestionBankEntryById, getQuestionBankEntries } from "@/lib/api/questionBankEntries/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionBankEntryIdSchema,
  insertQuestionBankEntryParams,
  updateQuestionBankEntryParams,
} from "@/lib/db/schema/questionBankEntries";
import { createQuestionBankEntry, deleteQuestionBankEntry, updateQuestionBankEntry } from "@/lib/api/questionBankEntries/mutations";

export const questionBankEntriesRouter = router({
  getQuestionBankEntries: publicProcedure.query(async () => {
    return getQuestionBankEntries();
  }),
  getQuestionBankEntryById: publicProcedure.input(questionBankEntryIdSchema).query(async ({ input }) => {
    return getQuestionBankEntryById(input.id);
  }),
  createQuestionBankEntry: publicProcedure
    .input(insertQuestionBankEntryParams)
    .mutation(async ({ input }) => {
      return createQuestionBankEntry(input);
    }),
  updateQuestionBankEntry: publicProcedure
    .input(updateQuestionBankEntryParams)
    .mutation(async ({ input }) => {
      return updateQuestionBankEntry(input.id, input);
    }),
  deleteQuestionBankEntry: publicProcedure
    .input(questionBankEntryIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionBankEntry(input.id);
    }),
});
