import { getExternalFunctionById, getExternalFunctions } from "@/lib/api/externalFunctions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  externalFunctionIdSchema,
  insertExternalFunctionParams,
  updateExternalFunctionParams,
} from "@/lib/db/schema/externalFunctions";
import { createExternalFunction, deleteExternalFunction, updateExternalFunction } from "@/lib/api/externalFunctions/mutations";

export const externalFunctionsRouter = router({
  getExternalFunctions: publicProcedure.query(async () => {
    return getExternalFunctions();
  }),
  getExternalFunctionById: publicProcedure.input(externalFunctionIdSchema).query(async ({ input }) => {
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
