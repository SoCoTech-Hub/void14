import { getTagAreaById, getTagAreas } from "@/lib/api/tagAreas/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  tagAreaIdSchema,
  insertTagAreaParams,
  updateTagAreaParams,
} from "@/lib/db/schema/tagAreas";
import { createTagArea, deleteTagArea, updateTagArea } from "@/lib/api/tagAreas/mutations";

export const tagAreasRouter = router({
  getTagAreas: publicProcedure.query(async () => {
    return getTagAreas();
  }),
  getTagAreaById: publicProcedure.input(tagAreaIdSchema).query(async ({ input }) => {
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
