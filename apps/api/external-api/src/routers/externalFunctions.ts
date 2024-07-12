import {
  externalFunctionIdSchema,
  insertExternalFunctionParams,
  updateExternalFunctionParams,
} from "@soco/external-db/schema/externalFunctions";

import {
  createExternalFunction,
  deleteExternalFunction,
  updateExternalFunction,
} from "../api/externalFunctions/mutations";
import {
  getExternalFunctionById,
  getExternalFunctions,
} from "../api/externalFunctions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const externalFunctionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getExternalFunctions: publicProcedure.query(async () => {
      return getExternalFunctions();
    }),
    getExternalFunctionById: publicProcedure
      .input(externalFunctionIdSchema)
      .query(async ({ input }) => {
        return getExternalFunctionById(input.id);
      }),
    createExternalFunction: publicProcedure
      .input(insertExternalFunctionParams)
      .mutation(async ({ input }) => {
        return createExternalFunction(input);
      }),
    updateExternalFunction: publicProcedure
      .input(updateExternalFunctionParams)
      .mutation(async ({ input }) => {
        return updateExternalFunction(input.id, input);
      }),
    deleteExternalFunction: publicProcedure
      .input(externalFunctionIdSchema)
      .mutation(async ({ input }) => {
        return deleteExternalFunction(input.id);
      }),
  });
