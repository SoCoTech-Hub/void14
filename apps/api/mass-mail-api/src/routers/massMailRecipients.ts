import { getMassMailRecipientById, getMassMailRecipients } from "../api/massMailRecipients/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  massMailRecipientIdSchema,
  insertMassMailRecipientParams,
  updateMassMailRecipientParams,
} from "@soco/mass-mail-db/schema/massMailRecipients";
import { createMassMailRecipient, deleteMassMailRecipient, updateMassMailRecipient } from "../api/massMailRecipients/mutations";

export const massMailRecipientsRouter =createTRPCRouter({
  getMassMailRecipients: publicProcedure.query(async () => {
    return getMassMailRecipients();
  }),
  getMassMailRecipientById: publicProcedure.input(massMailRecipientIdSchema).query(async ({ input }) => {
    return getMassMailRecipientById(input.id);
  }),
  createMassMailRecipient: publicProcedure
    .input(insertMassMailRecipientParams)
    .mutation(async ({ input }) => {
      return createMassMailRecipient(input);
    }),
  updateMassMailRecipient: publicProcedure
    .input(updateMassMailRecipientParams)
    .mutation(async ({ input }) => {
      return updateMassMailRecipient(input.id, input);
    }),
  deleteMassMailRecipient: publicProcedure
    .input(massMailRecipientIdSchema)
    .mutation(async ({ input }) => {
      return deleteMassMailRecipient(input.id);
    }),
});
