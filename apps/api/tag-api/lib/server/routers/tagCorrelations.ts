import {
  createTagCorrelation,
  deleteTagCorrelation,
  updateTagCorrelation,
} from "../api/tagCorrelations/mutations";
import {
  getTagCorrelationById,
  getTagCorrelations,
} from "../api/tagCorrelations/queries";
import {
  insertTagCorrelationParams,
  tagCorrelationIdSchema,
  updateTagCorrelationParams,
} from "../db/schema/tagCorrelations";
import { publicProcedure, router } from "../server/trpc";

export const tagCorrelationsRouter = router({
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
