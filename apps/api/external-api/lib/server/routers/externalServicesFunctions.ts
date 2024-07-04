import {
  createExternalServicesFunction,
  deleteExternalServicesFunction,
  updateExternalServicesFunction,
} from "../api/externalServicesFunctions/mutations";
import {
  getExternalServicesFunctionById,
  getExternalServicesFunctions,
} from "../api/externalServicesFunctions/queries";
import {
  externalServicesFunctionIdSchema,
  insertExternalServicesFunctionParams,
  updateExternalServicesFunctionParams,
} from "../db/schema/externalServicesFunctions";
import { publicProcedure, router } from "../server/trpc";

export const externalServicesFunctionsRouter = router({
  getExternalServicesFunctions: publicProcedure.query(async () => {
    return getExternalServicesFunctions();
  }),
  getExternalServicesFunctionById: publicProcedure
    .input(externalServicesFunctionIdSchema)
    .query(async ({ input }) => {
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
