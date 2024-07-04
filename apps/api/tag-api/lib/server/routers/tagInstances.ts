import {
  createTagInstance,
  deleteTagInstance,
  updateTagInstance,
} from "../api/tagInstances/mutations";
import {
  getTagInstanceById,
  getTagInstances,
} from "../api/tagInstances/queries";
import {
  insertTagInstanceParams,
  tagInstanceIdSchema,
  updateTagInstanceParams,
} from "../db/schema/tagInstances";
import { publicProcedure, router } from "../server/trpc";

export const tagInstancesRouter = router({
  getTagInstances: publicProcedure.query(async () => {
    return getTagInstances();
  }),
  getTagInstanceById: publicProcedure
    .input(tagInstanceIdSchema)
    .query(async ({ input }) => {
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
