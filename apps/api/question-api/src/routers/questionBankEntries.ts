import {
  insertQuestionBankEntryParams,
  questionBankEntryIdSchema,
  updateQuestionBankEntryParams,
} from "@soco/question-db/schema/questionBankEntries";

import {
  createQuestionBankEntry,
  deleteQuestionBankEntry,
  updateQuestionBankEntry,
} from "../api/questionBankEntries/mutations";
import {
  getQuestionBankEntries,
  getQuestionBankEntryById,
} from "../api/questionBankEntries/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionBankEntriesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuestionBankEntries: publicProcedure.query(async () => {
      return getQuestionBankEntries();
    }),
    getQuestionBankEntryById: publicProcedure
      .input(questionBankEntryIdSchema)
      .query(async ({ input }) => {
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
