import {
  createSupportStatus,
  deleteSupportStatus,
  updateSupportStatus,
} from "../api/supportStatuses/mutations";
import {
  getSupportStatusById,
  getSupportStatuses,
} from "../api/supportStatuses/queries";
import {
  insertSupportStatusParams,
  supportStatusIdSchema,
  updateSupportStatusParams,
} from "../db/schema/supportStatuses";
import { publicProcedure, router } from "../server/trpc";

export const supportStatusesRouter = router({
  getSupportStatuses: publicProcedure.query(async () => {
    return getSupportStatuses();
  }),
  getSupportStatusById: publicProcedure
    .input(supportStatusIdSchema)
    .query(async ({ input }) => {
      return getSupportStatusById(input.id);
    }),
  createSupportStatus: publicProcedure
    .input(insertSupportStatusParams)
    .mutation(async ({ input }) => {
      return createSupportStatus(input);
    }),
  updateSupportStatus: publicProcedure
    .input(updateSupportStatusParams)
    .mutation(async ({ input }) => {
      return updateSupportStatus(input.id, input);
    }),
  deleteSupportStatus: publicProcedure
    .input(supportStatusIdSchema)
    .mutation(async ({ input }) => {
      return deleteSupportStatus(input.id);
    }),
});