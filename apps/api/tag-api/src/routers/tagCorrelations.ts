import {
  insertTagCorrelationParams,
  tagCorrelationIdSchema,
  updateTagCorrelationParams,
} from "@soco/tag-db/schema/tagCorrelations";

import {
  createTagCorrelation,
  deleteTagCorrelation,
  updateTagCorrelation,
} from "../api/tagCorrelations/mutations";
import {
  getTagCorrelationById,
  getTagCorrelations,
} from "../api/tagCorrelations/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagCorrelationsRouter = createTRPCRouter({
  getTagCorrelations: publicProcedure.query(async () => {
    return getTagCorrelations();
  }),
  getTagCorrelationById: publicProcedure
    .input(tagCorrelationIdSchema)
    .query(async ({ input }) => {
      return getTagCorrelationById(input.id);
    }),
  createTagCorrelation: publicProcedure
    .input(insertTagCorrelationParams)
    .mutation(async ({ input }) => {
      return createTagCorrelation(input);
    }),
  updateTagCorrelation: publicProcedure
    .input(updateTagCorrelationParams)
    .mutation(async ({ input }) => {
      return updateTagCorrelation(input.id, input);
    }),
  deleteTagCorrelation: publicProcedure
    .input(tagCorrelationIdSchema)
    .mutation(async ({ input }) => {
      return deleteTagCorrelation(input.id);
    }),
});
