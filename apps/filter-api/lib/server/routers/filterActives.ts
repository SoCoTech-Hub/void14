import { getFilterActiveById, getFilterActives } from "@/lib/api/filterActives/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  filterActiveIdSchema,
  insertFilterActiveParams,
  updateFilterActiveParams,
} from "@/lib/db/schema/filterActives";
import { createFilterActive, deleteFilterActive, updateFilterActive } from "@/lib/api/filterActives/mutations";

export const filterActivesRouter = router({
  getFilterActives: publicProcedure.query(async () => {
    return getFilterActives();
  }),
  getFilterActiveById: publicProcedure.input(filterActiveIdSchema).query(async ({ input }) => {
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
