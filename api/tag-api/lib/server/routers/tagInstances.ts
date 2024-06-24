import { getTagInstanceById, getTagInstances } from "@/lib/api/tagInstances/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  tagInstanceIdSchema,
  insertTagInstanceParams,
  updateTagInstanceParams,
} from "@/lib/db/schema/tagInstances";
import { createTagInstance, deleteTagInstance, updateTagInstance } from "@/lib/api/tagInstances/mutations";

export const tagInstancesRouter = router({
  getTagInstances: publicProcedure.query(async () => {
    return getTagInstances();
  }),
  getTagInstanceById: publicProcedure.input(tagInstanceIdSchema).query(async ({ input }) => {
    return getTagInstanceById(input.id);
  }),
  createTagInstance: publicProcedure
    .input(insertTagInstanceParams)
    .mutation(async ({ input }) => {
      return createTagInstance(input);
    }),
  updateTagInstance: publicProcedure
    .input(updateTagInstanceParams)
    .mutation(async ({ input }) => {
      return updateTagInstance(input.id, input);
    }),
  deleteTagInstance: publicProcedure
    .input(tagInstanceIdSchema)
    .mutation(async ({ input }) => {
      return deleteTagInstance(input.id);
    }),
});
