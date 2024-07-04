import {
  createGradingformGuideFilling,
  deleteGradingformGuideFilling,
  updateGradingformGuideFilling,
} from "../api/gradingformGuideFillings/mutations";
import {
  getGradingformGuideFillingById,
  getGradingformGuideFillings,
} from "../api/gradingformGuideFillings/queries";
import {
  gradingformGuideFillingIdSchema,
  insertGradingformGuideFillingParams,
  updateGradingformGuideFillingParams,
} from "../db/schema/gradingformGuideFillings";
import { publicProcedure, router } from "../server/trpc";

export const gradingformGuideFillingsRouter = router({
  getGradingformGuideFillings: publicProcedure.query(async () => {
    return getGradingformGuideFillings();
  }),
  getGradingformGuideFillingById: publicProcedure
    .input(gradingformGuideFillingIdSchema)
    .query(async ({ input }) => {
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
