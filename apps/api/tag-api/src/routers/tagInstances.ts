import {
  insertTagInstanceParams,
  tagInstanceIdSchema,
  updateTagInstanceParams,
} from "@soco/tag-db/schema/tagInstances";

import {
  createTagInstance,
  deleteTagInstance,
  updateTagInstance,
} from "../api/tagInstances/mutations";
import {
  getTagInstanceById,
  getTagInstances,
} from "../api/tagInstances/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagInstancesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
