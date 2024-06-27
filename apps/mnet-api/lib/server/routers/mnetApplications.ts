import { getMnetApplicationById, getMnetApplications } from "@/lib/api/mnetApplications/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetApplicationIdSchema,
  insertMnetApplicationParams,
  updateMnetApplicationParams,
} from "@/lib/db/schema/mnetApplications";
import { createMnetApplication, deleteMnetApplication, updateMnetApplication } from "@/lib/api/mnetApplications/mutations";

export const mnetApplicationsRouter = router({
  getMnetApplications: publicProcedure.query(async () => {
    return getMnetApplications();
  }),
  getMnetApplicationById: publicProcedure.input(mnetApplicationIdSchema).query(async ({ input }) => {
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
