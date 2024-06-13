import { getToolUserToursStepById, getToolUserToursSteps } from "@/lib/api/toolUserToursSteps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolUserToursStepIdSchema,
  insertToolUserToursStepParams,
  updateToolUserToursStepParams,
} from "@/lib/db/schema/toolUserToursSteps";
import { createToolUserToursStep, deleteToolUserToursStep, updateToolUserToursStep } from "@/lib/api/toolUserToursSteps/mutations";

export const toolUserToursStepsRouter = router({
  getToolUserToursSteps: publicProcedure.query(async () => {
    return getToolUserToursSteps();
  }),
  getToolUserToursStepById: publicProcedure.input(toolUserToursStepIdSchema).query(async ({ input }) => {
    return getToolUserToursStepById(input.id);
  }),
  createToolUserToursStep: publicProcedure
    .input(insertToolUserToursStepParams)
    .mutation(async ({ input }) => {
      return createToolUserToursStep(input);
    }),
  updateToolUserToursStep: publicProcedure
    .input(updateToolUserToursStepParams)
    .mutation(async ({ input }) => {
      return updateToolUserToursStep(input.id, input);
    }),
  deleteToolUserToursStep: publicProcedure
    .input(toolUserToursStepIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolUserToursStep(input.id);
    }),
});
