import { getTagInstanceById, getTagInstances } from "../api/tagInstances/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  tagInstanceIdSchema,
  insertTagInstanceParams,
  updateTagInstanceParams,
} from "@soco/tag-db/schema/tagInstances";
import { createTagInstance, deleteTagInstance, updateTagInstance } from "../api/tagInstances/mutations";

export const tagInstancesRouter =createTRPCRouter({
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
