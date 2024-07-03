import { getExternalServiceById, getExternalServices } from "@/lib/api/externalServices/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  externalServiceIdSchema,
  insertExternalServiceParams,
  updateExternalServiceParams,
} from "@/lib/db/schema/externalServices";
import { createExternalService, deleteExternalService, updateExternalService } from "@/lib/api/externalServices/mutations";

export const externalServicesRouter = router({
  getExternalServices: publicProcedure.query(async () => {
    return getExternalServices();
  }),
  getExternalServiceById: publicProcedure.input(externalServiceIdSchema).query(async ({ input }) => {
    return getExternalServiceById(input.id);
  }),
  createExternalService: publicProcedure
    .input(insertExternalServiceParams)
    .mutation(async ({ input }) => {
      return createExternalService(input);
    }),
  updateExternalService: publicProcedure
    .input(updateExternalServiceParams)
    .mutation(async ({ input }) => {
      return updateExternalService(input.id, input);
    }),
  deleteExternalService: publicProcedure
    .input(externalServiceIdSchema)
    .mutation(async ({ input }) => {
      return deleteExternalService(input.id);
    }),
});
