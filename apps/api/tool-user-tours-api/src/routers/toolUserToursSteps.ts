import {
  insertToolUserToursStepParams,
  toolUserToursStepIdSchema,
  updateToolUserToursStepParams,
} from "@soco/tool-user-tours-db/schema/toolUserToursSteps";

import {
  createToolUserToursStep,
  deleteToolUserToursStep,
  updateToolUserToursStep,
} from "../api/toolUserToursSteps/mutations";
import {
  getToolUserToursStepById,
  getToolUserToursSteps,
} from "../api/toolUserToursSteps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolUserToursStepsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getToolUserToursSteps: publicProcedure.query(async () => {
      return getToolUserToursSteps();
    }),
    getToolUserToursStepById: publicProcedure
      .input(toolUserToursStepIdSchema)
      .query(async ({ input }) => {
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
