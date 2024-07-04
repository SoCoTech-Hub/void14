import { createLabel, deleteLabel, updateLabel } from "../api/labels/mutations";
import { getLabelById, getLabels } from "../api/labels/queries";
import {
  insertLabelParams,
  labelIdSchema,
  updateLabelParams,
} from "../db/schema/labels";
import { publicProcedure, router } from "../server/trpc";

export const labelsRouter = router({
  getLabels: publicProcedure.query(async () => {
    return getLabels();
  }),
  getLabelById: publicProcedure
    .input(labelIdSchema)
    .query(async ({ input }) => {
      return getLabelById(input.id);
    }),
  createLabel: publicProcedure
    .input(insertLabelParams)
    .mutation(async ({ input }) => {
      return createLabel(input);
    }),
  updateLabel: publicProcedure
    .input(updateLabelParams)
    .mutation(async ({ input }) => {
      return updateLabel(input.id, input);
    }),
  deleteLabel: publicProcedure
    .input(labelIdSchema)
    .mutation(async ({ input }) => {
      return deleteLabel(input.id);
    }),
});
