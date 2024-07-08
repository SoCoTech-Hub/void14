import { getFilterConfigById, getFilterConfigs } from "../api/filterConfigs/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  filterConfigIdSchema,
  insertFilterConfigParams,
  updateFilterConfigParams,
} from "@soco/filter-db/schema/filterConfigs";
import { createFilterConfig, deleteFilterConfig, updateFilterConfig } from "../api/filterConfigs/mutations";

export const filterConfigsRouter =createTRPCRouter({
  getFilterConfigs: publicProcedure.query(async () => {
    return getFilterConfigs();
  }),
  getFilterConfigById: publicProcedure.input(filterConfigIdSchema).query(async ({ input }) => {
    return getFilterConfigById(input.id);
  }),
  createFilterConfig: publicProcedure
    .input(insertFilterConfigParams)
    .mutation(async ({ input }) => {
      return createFilterConfig(input);
    }),
  updateFilterConfig: publicProcedure
    .input(updateFilterConfigParams)
    .mutation(async ({ input }) => {
      return updateFilterConfig(input.id, input);
    }),
  deleteFilterConfig: publicProcedure
    .input(filterConfigIdSchema)
    .mutation(async ({ input }) => {
      return deleteFilterConfig(input.id);
    }),
});
