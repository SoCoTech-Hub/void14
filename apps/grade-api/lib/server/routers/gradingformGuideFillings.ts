import { getGradingformGuideFillingById, getGradingformGuideFillings } from "@/lib/api/gradingformGuideFillings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradingformGuideFillingIdSchema,
  insertGradingformGuideFillingParams,
  updateGradingformGuideFillingParams,
} from "@/lib/db/schema/gradingformGuideFillings";
import { createGradingformGuideFilling, deleteGradingformGuideFilling, updateGradingformGuideFilling } from "@/lib/api/gradingformGuideFillings/mutations";

export const gradingformGuideFillingsRouter = router({
  getGradingformGuideFillings: publicProcedure.query(async () => {
    return getGradingformGuideFillings();
  }),
  getGradingformGuideFillingById: publicProcedure.input(gradingformGuideFillingIdSchema).query(async ({ input }) => {
    return getGradingformGuideFillingById(input.id);
  }),
  createGradingformGuideFilling: publicProcedure
    .input(insertGradingformGuideFillingParams)
    .mutation(async ({ input }) => {
      return createGradingformGuideFilling(input);
    }),
  updateGradingformGuideFilling: publicProcedure
    .input(updateGradingformGuideFillingParams)
    .mutation(async ({ input }) => {
      return updateGradingformGuideFilling(input.id, input);
    }),
  deleteGradingformGuideFilling: publicProcedure
    .input(gradingformGuideFillingIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradingformGuideFilling(input.id);
    }),
});
