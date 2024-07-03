import { getMassMailMessageById, getMassMailMessages } from "@/lib/api/massMailMessages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  massMailMessageIdSchema,
  insertMassMailMessageParams,
  updateMassMailMessageParams,
} from "@/lib/db/schema/massMailMessages";
import { createMassMailMessage, deleteMassMailMessage, updateMassMailMessage } from "@/lib/api/massMailMessages/mutations";

export const massMailMessagesRouter = router({
  getMassMailMessages: publicProcedure.query(async () => {
    return getMassMailMessages();
  }),
  getMassMailMessageById: publicProcedure.input(massMailMessageIdSchema).query(async ({ input }) => {
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
