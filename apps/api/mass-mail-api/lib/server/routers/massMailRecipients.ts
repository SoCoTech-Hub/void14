import {
  createMassMailRecipient,
  deleteMassMailRecipient,
  updateMassMailRecipient,
} from "../api/massMailRecipients/mutations";
import {
  getMassMailRecipientById,
  getMassMailRecipients,
} from "../api/massMailRecipients/queries";
import {
  insertMassMailRecipientParams,
  massMailRecipientIdSchema,
  updateMassMailRecipientParams,
} from "../db/schema/massMailRecipients";
import { publicProcedure, router } from "../server/trpc";

export const massMailRecipientsRouter = router({
  getMassMailRecipients: publicProcedure.query(async () => {
    return getMassMailRecipients();
  }),
  getMassMailRecipientById: publicProcedure
    .input(massMailRecipientIdSchema)
    .query(async ({ input }) => {
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
