import {
  insertMassMailMessageParams,
  massMailMessageIdSchema,
  updateMassMailMessageParams,
} from "@soco/mass-mail-db/schema/massMailMessages";

import {
  createMassMailMessage,
  deleteMassMailMessage,
  updateMassMailMessage,
} from "../api/massMailMessages/mutations";
import {
  getMassMailMessageById,
  getMassMailMessages,
} from "../api/massMailMessages/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const massMailMessagesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getMassMailMessages: publicProcedure.query(async () => {
      return getMassMailMessages();
    }),
    getMassMailMessageById: publicProcedure
      .input(massMailMessageIdSchema)
      .query(async ({ input }) => {
        return getMassMailMessageById(input.id);
      }),
    createMassMailMessage: publicProcedure
      .input(insertMassMailMessageParams)
      .mutation(async ({ input }) => {
        return createMassMailMessage(input);
      }),
    updateMassMailMessage: publicProcedure
      .input(updateMassMailMessageParams)
      .mutation(async ({ input }) => {
        return updateMassMailMessage(input.id, input);
      }),
    deleteMassMailMessage: publicProcedure
      .input(massMailMessageIdSchema)
      .mutation(async ({ input }) => {
        return deleteMassMailMessage(input.id);
      }),
  });
