import {
  createMnetService,
  deleteMnetService,
  updateMnetService,
} from "../api/mnetServices/mutations";
import {
  getMnetServiceById,
  getMnetServices,
} from "../api/mnetServices/queries";
import {
  insertMnetServiceParams,
  mnetServiceIdSchema,
  updateMnetServiceParams,
} from "../db/schema/mnetServices";
import { publicProcedure, router } from "../server/trpc";

export const mnetServicesRouter = router({
  getMnetServices: publicProcedure.query(async () => {
    return getMnetServices();
  }),
  getMnetServiceById: publicProcedure
    .input(mnetServiceIdSchema)
    .query(async ({ input }) => {
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
