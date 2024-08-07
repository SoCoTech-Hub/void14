import {
  externalServicesFunctionIdSchema,
  insertExternalServicesFunctionParams,
  updateExternalServicesFunctionParams,
} from "@soco/external-db/schema/externalServicesFunctions";

import {
  createExternalServicesFunction,
  deleteExternalServicesFunction,
  updateExternalServicesFunction,
} from "../api/externalServicesFunctions/mutations";
import {
  getExternalServicesFunctionById,
  getExternalServicesFunctions,
} from "../api/externalServicesFunctions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const externalServicesFunctionsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
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
