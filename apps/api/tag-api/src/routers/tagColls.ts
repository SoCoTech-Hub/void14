import {
  insertTagCollParams,
  tagCollIdSchema,
  updateTagCollParams,
} from "@soco/tag-db/schema/tagColls";

import {
  createTagColl,
  deleteTagColl,
  updateTagColl,
} from "../api/tagColls/mutations";
import { getTagCollById, getTagColls } from "../api/tagColls/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagCollsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getTagColls: publicProcedure.query(async () => {
      return getTagColls();
    }),
    getTagCollById: publicProcedure
      .input(tagCollIdSchema)
      .query(async ({ input }) => {
        return getTagCollById(input.id);
      }),
    createTagColl: publicProcedure
      .input(insertTagCollParams)
      .mutation(async ({ input }) => {
        return createTagColl(input);
      }),
    updateTagColl: publicProcedure
      .input(updateTagCollParams)
      .mutation(async ({ input }) => {
        return updateTagColl(input.id, input);
      }),
    deleteTagColl: publicProcedure
      .input(tagCollIdSchema)
      .mutation(async ({ input }) => {
        return deleteTagColl(input.id);
      }),
  });
