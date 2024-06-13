import { getToolUserToursTourById, getToolUserToursTours } from "@/lib/api/toolUserToursTours/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolUserToursTourIdSchema,
  insertToolUserToursTourParams,
  updateToolUserToursTourParams,
} from "@/lib/db/schema/toolUserToursTours";
import { createToolUserToursTour, deleteToolUserToursTour, updateToolUserToursTour } from "@/lib/api/toolUserToursTours/mutations";

export const toolUserToursToursRouter = router({
  getToolUserToursTours: publicProcedure.query(async () => {
    return getToolUserToursTours();
  }),
  getToolUserToursTourById: publicProcedure.input(toolUserToursTourIdSchema).query(async ({ input }) => {
    return getToolUserToursTourById(input.id);
  }),
  createToolUserToursTour: publicProcedure
    .input(insertToolUserToursTourParams)
    .mutation(async ({ input }) => {
      return createToolUserToursTour(input);
    }),
  updateToolUserToursTour: publicProcedure
    .input(updateToolUserToursTourParams)
    .mutation(async ({ input }) => {
      return updateToolUserToursTour(input.id, input);
    }),
  deleteToolUserToursTour: publicProcedure
    .input(toolUserToursTourIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolUserToursTour(input.id);
    }),
});
