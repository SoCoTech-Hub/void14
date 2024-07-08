import { getLogQueryById, getLogQueries } from "../api/logQueries/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  logQueryIdSchema,
  insertLogQueryParams,
  updateLogQueryParams,
} from "@soco/log-db/schema/logQueries";
import { createLogQuery, deleteLogQuery, updateLogQuery } from "../api/logQueries/mutations";

export const logQueriesRouter =createTRPCRouter({
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
