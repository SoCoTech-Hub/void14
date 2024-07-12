import {
  filterActiveIdSchema,
  insertFilterActiveParams,
  updateFilterActiveParams,
} from "@soco/filter-db/schema/filterActives";

import {
  createFilterActive,
  deleteFilterActive,
  updateFilterActive,
} from "../api/filterActives/mutations";
import {
  getFilterActiveById,
  getFilterActives,
} from "../api/filterActives/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const filterActivesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getFilterActives: publicProcedure.query(async () => {
      return getFilterActives();
    }),
    getFilterActiveById: publicProcedure
      .input(filterActiveIdSchema)
      .query(async ({ input }) => {
        return getFilterActiveById(input.id);
      }),
    createFilterActive: publicProcedure
      .input(insertFilterActiveParams)
      .mutation(async ({ input }) => {
        return createFilterActive(input);
      }),
    updateFilterActive: publicProcedure
      .input(updateFilterActiveParams)
      .mutation(async ({ input }) => {
        return updateFilterActive(input.id, input);
      }),
    deleteFilterActive: publicProcedure
      .input(filterActiveIdSchema)
      .mutation(async ({ input }) => {
        return deleteFilterActive(input.id);
      }),
  });
