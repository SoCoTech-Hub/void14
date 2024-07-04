import {
  createMnetApplication,
  deleteMnetApplication,
  updateMnetApplication,
} from "../api/mnetApplications/mutations";
import {
  getMnetApplicationById,
  getMnetApplications,
} from "../api/mnetApplications/queries";
import {
  insertMnetApplicationParams,
  mnetApplicationIdSchema,
  updateMnetApplicationParams,
} from "../db/schema/mnetApplications";
import { publicProcedure, router } from "../server/trpc";

export const mnetApplicationsRouter = router({
  getMnetApplications: publicProcedure.query(async () => {
    return getMnetApplications();
  }),
  getMnetApplicationById: publicProcedure
    .input(mnetApplicationIdSchema)
    .query(async ({ input }) => {
      return getMnetApplicationById(input.id);
    }),
  createMnetApplication: publicProcedure
    .input(insertMnetApplicationParams)
    .mutation(async ({ input }) => {
      return createMnetApplication(input);
    }),
  updateMnetApplication: publicProcedure
    .input(updateMnetApplicationParams)
    .mutation(async ({ input }) => {
      return updateMnetApplication(input.id, input);
    }),
  deleteMnetApplication: publicProcedure
    .input(mnetApplicationIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetApplication(input.id);
    }),
});
