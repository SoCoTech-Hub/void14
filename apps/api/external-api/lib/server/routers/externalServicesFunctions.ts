import { getExternalServicesFunctionById, getExternalServicesFunctions } from "@/lib/api/externalServicesFunctions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  externalServicesFunctionIdSchema,
  insertExternalServicesFunctionParams,
  updateExternalServicesFunctionParams,
} from "@/lib/db/schema/externalServicesFunctions";
import { createExternalServicesFunction, deleteExternalServicesFunction, updateExternalServicesFunction } from "@/lib/api/externalServicesFunctions/mutations";

export const externalServicesFunctionsRouter = router({
  getExternalServicesFunctions: publicProcedure.query(async () => {
    return getExternalServicesFunctions();
  }),
  getExternalServicesFunctionById: publicProcedure.input(externalServicesFunctionIdSchema).query(async ({ input }) => {
    return getExternalServicesFunctionById(input.id);
  }),
  createExternalServicesFunction: publicProcedure
    .input(insertExternalServicesFunctionParams)
    .mutation(async ({ input }) => {
      return createExternalServicesFunction(input);
    }),
  updateExternalServicesFunction: publicProcedure
    .input(updateExternalServicesFunctionParams)
    .mutation(async ({ input }) => {
      return updateExternalServicesFunction(input.id, input);
    }),
  deleteExternalServicesFunction: publicProcedure
    .input(externalServicesFunctionIdSchema)
    .mutation(async ({ input }) => {
      return deleteExternalServicesFunction(input.id);
    }),
});
