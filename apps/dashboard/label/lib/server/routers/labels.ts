import { getLabelById, getLabels } from "@/lib/api/labels/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  labelIdSchema,
  insertLabelParams,
  updateLabelParams,
} from "@/lib/db/schema/labels";
import { createLabel, deleteLabel, updateLabel } from "@/lib/api/labels/mutations";

export const labelsRouter = router({
  getLabels: publicProcedure.query(async () => {
    return getLabels();
  }),
  getLabelById: publicProcedure.input(labelIdSchema).query(async ({ input }) => {
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
