import { getLogQueryById, getLogQueries } from "@/lib/api/logQueries/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  logQueryIdSchema,
  insertLogQueryParams,
  updateLogQueryParams,
} from "@/lib/db/schema/logQueries";
import { createLogQuery, deleteLogQuery, updateLogQuery } from "@/lib/api/logQueries/mutations";

export const logQueriesRouter = router({
  getLogQueries: publicProcedure.query(async () => {
    return getLogQueries();
  }),
  getLogQueryById: publicProcedure.input(logQueryIdSchema).query(async ({ input }) => {
    return getLogQueryById(input.id);
  }),
  createLogQuery: publicProcedure
    .input(insertLogQueryParams)
    .mutation(async ({ input }) => {
      return createLogQuery(input);
    }),
  updateLogQuery: publicProcedure
    .input(updateLogQueryParams)
    .mutation(async ({ input }) => {
      return updateLogQuery(input.id, input);
    }),
  deleteLogQuery: publicProcedure
    .input(logQueryIdSchema)
    .mutation(async ({ input }) => {
      return deleteLogQuery(input.id);
    }),
});
