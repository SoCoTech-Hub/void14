import { getMnetApplicationById, getMnetApplications } from "../api/mnetApplications/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  mnetApplicationIdSchema,
  insertMnetApplicationParams,
  updateMnetApplicationParams,
} from "@soco/mnet-db/schema/mnetApplications";
import { createMnetApplication, deleteMnetApplication, updateMnetApplication } from "../api/mnetApplications/mutations";

export const mnetApplicationsRouter =createTRPCRouter({
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
