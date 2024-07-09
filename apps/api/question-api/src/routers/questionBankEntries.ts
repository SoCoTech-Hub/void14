import { getQuestionBankEntryById, getQuestionBankEntries } from "../api/questionBankEntries/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionBankEntryIdSchema,
  insertQuestionBankEntryParams,
  updateQuestionBankEntryParams,
} from "@soco/question-db/schema/questionBankEntries";
import { createQuestionBankEntry, deleteQuestionBankEntry, updateQuestionBankEntry } from "../api/questionBankEntries/mutations";

export const questionBankEntriesRouter =createTRPCRouter({
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