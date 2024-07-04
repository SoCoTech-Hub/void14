import {
  createExternalFunction,
  deleteExternalFunction,
  updateExternalFunction,
} from "../api/externalFunctions/mutations";
import {
  getExternalFunctionById,
  getExternalFunctions,
} from "../api/externalFunctions/queries";
import {
  externalFunctionIdSchema,
  insertExternalFunctionParams,
  updateExternalFunctionParams,
} from "../db/schema/externalFunctions";
import { publicProcedure, router } from "../server/trpc";

export const externalFunctionsRouter = router({
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
