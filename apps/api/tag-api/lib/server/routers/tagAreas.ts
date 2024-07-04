import {
  createTagArea,
  deleteTagArea,
  updateTagArea,
} from "../api/tagAreas/mutations";
import { getTagAreaById, getTagAreas } from "../api/tagAreas/queries";
import {
  insertTagAreaParams,
  tagAreaIdSchema,
  updateTagAreaParams,
} from "../db/schema/tagAreas";
import { publicProcedure, router } from "../server/trpc";

export const tagAreasRouter = router({
  getTagAreas: publicProcedure.query(async () => {
    return getTagAreas();
  }),
  getTagAreaById: publicProcedure
    .input(tagAreaIdSchema)
    .query(async ({ input }) => {
      return getTagAreaById(input.id);
    }),
  createTagArea: publicProcedure
    .input(insertTagAreaParams)
    .mutation(async ({ input }) => {
      return createTagArea(input);
    }),
  updateTagArea: publicProcedure
    .input(updateTagAreaParams)
    .mutation(async ({ input }) => {
      return updateTagArea(input.id, input);
    }),
  deleteTagArea: publicProcedure
    .input(tagAreaIdSchema)
    .mutation(async ({ input }) => {
      return deleteTagArea(input.id);
    }),
});
