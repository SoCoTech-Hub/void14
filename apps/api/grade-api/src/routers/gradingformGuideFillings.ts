import { getGradingformGuideFillingById, getGradingformGuideFillings } from "../api/gradingformGuideFillings/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  gradingformGuideFillingIdSchema,
  insertGradingformGuideFillingParams,
  updateGradingformGuideFillingParams,
} from "@soco/grade-db/schema/gradingformGuideFillings";
import { createGradingformGuideFilling, deleteGradingformGuideFilling, updateGradingformGuideFilling } from "../api/gradingformGuideFillings/mutations";

export const gradingformGuideFillingsRouter =createTRPCRouter({
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
