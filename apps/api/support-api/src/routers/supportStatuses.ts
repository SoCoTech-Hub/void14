import { getSupportStatusById, getSupportStatuses } from "../api/supportStatuses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  supportStatusIdSchema,
  insertSupportStatusParams,
  updateSupportStatusParams,
} from "@soco/support-db/schema/supportStatuses";
import { createSupportStatus, deleteSupportStatus, updateSupportStatus } from "../api/supportStatuses/mutations";

export const supportStatusesRouter =createTRPCRouter({
  getSupportStatuses: publicProcedure.query(async () => {
    return getSupportStatuses();
  }),
  getSupportStatusById: publicProcedure.input(supportStatusIdSchema).query(async ({ input }) => {
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
