import { getMnetServiceById, getMnetServices } from "@/lib/api/mnetServices/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetServiceIdSchema,
  insertMnetServiceParams,
  updateMnetServiceParams,
} from "@/lib/db/schema/mnetServices";
import { createMnetService, deleteMnetService, updateMnetService } from "@/lib/api/mnetServices/mutations";

export const mnetServicesRouter = router({
  getMnetServices: publicProcedure.query(async () => {
    return getMnetServices();
  }),
  getMnetServiceById: publicProcedure.input(mnetServiceIdSchema).query(async ({ input }) => {
    return getMnetServiceById(input.id);
  }),
  createMnetService: publicProcedure
    .input(insertMnetServiceParams)
    .mutation(async ({ input }) => {
      return createMnetService(input);
    }),
  updateMnetService: publicProcedure
    .input(updateMnetServiceParams)
    .mutation(async ({ input }) => {
      return updateMnetService(input.id, input);
    }),
  deleteMnetService: publicProcedure
    .input(mnetServiceIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetService(input.id);
    }),
});
