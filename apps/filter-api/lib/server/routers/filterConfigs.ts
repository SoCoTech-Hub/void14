import { getFilterConfigById, getFilterConfigs } from "@/lib/api/filterConfigs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  filterConfigIdSchema,
  insertFilterConfigParams,
  updateFilterConfigParams,
} from "@/lib/db/schema/filterConfigs";
import { createFilterConfig, deleteFilterConfig, updateFilterConfig } from "@/lib/api/filterConfigs/mutations";

export const filterConfigsRouter = router({
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
