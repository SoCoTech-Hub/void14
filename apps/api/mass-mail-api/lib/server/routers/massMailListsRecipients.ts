import {
  createMassMailListsRecipient,
  deleteMassMailListsRecipient,
  updateMassMailListsRecipient,
} from "../api/massMailListsRecipients/mutations";
import {
  getMassMailListsRecipientById,
  getMassMailListsRecipients,
} from "../api/massMailListsRecipients/queries";
import {
  insertMassMailListsRecipientParams,
  massMailListsRecipientIdSchema,
  updateMassMailListsRecipientParams,
} from "../db/schema/massMailListsRecipients";
import { publicProcedure, router } from "../server/trpc";

export const massMailListsRecipientsRouter = router({
  getMassMailListsRecipients: publicProcedure.query(async () => {
    return getMassMailListsRecipients();
  }),
  getMassMailListsRecipientById: publicProcedure
    .input(massMailListsRecipientIdSchema)
    .query(async ({ input }) => {
      return getMassMailListsRecipientById(input.id);
    }),
  createMassMailListsRecipient: publicProcedure
    .input(insertMassMailListsRecipientParams)
    .mutation(async ({ input }) => {
      return createMassMailListsRecipient(input);
    }),
  updateMassMailListsRecipient: publicProcedure
    .input(updateMassMailListsRecipientParams)
    .mutation(async ({ input }) => {
      return updateMassMailListsRecipient(input.id, input);
    }),
  deleteMassMailListsRecipient: publicProcedure
    .input(massMailListsRecipientIdSchema)
    .mutation(async ({ input }) => {
      return deleteMassMailListsRecipient(input.id);
    }),
});
