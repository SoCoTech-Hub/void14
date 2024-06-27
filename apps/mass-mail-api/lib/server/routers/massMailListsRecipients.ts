import { getMassMailListsRecipientById, getMassMailListsRecipients } from "@/lib/api/massMailListsRecipients/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  massMailListsRecipientIdSchema,
  insertMassMailListsRecipientParams,
  updateMassMailListsRecipientParams,
} from "@/lib/db/schema/massMailListsRecipients";
import { createMassMailListsRecipient, deleteMassMailListsRecipient, updateMassMailListsRecipient } from "@/lib/api/massMailListsRecipients/mutations";

export const massMailListsRecipientsRouter = router({
  getMassMailListsRecipients: publicProcedure.query(async () => {
    return getMassMailListsRecipients();
  }),
  getMassMailListsRecipientById: publicProcedure.input(massMailListsRecipientIdSchema).query(async ({ input }) => {
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
