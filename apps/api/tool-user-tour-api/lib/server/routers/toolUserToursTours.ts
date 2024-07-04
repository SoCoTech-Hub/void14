import {
  createToolUserToursTour,
  deleteToolUserToursTour,
  updateToolUserToursTour,
} from "../api/toolUserToursTours/mutations";
import {
  getToolUserToursTourById,
  getToolUserToursTours,
} from "../api/toolUserToursTours/queries";
import {
  insertToolUserToursTourParams,
  toolUserToursTourIdSchema,
  updateToolUserToursTourParams,
} from "../db/schema/toolUserToursTours";
import { publicProcedure, router } from "../server/trpc";

export const toolUserToursToursRouter = router({
  getToolUserToursTours: publicProcedure.query(async () => {
    return getToolUserToursTours();
  }),
  getToolUserToursTourById: publicProcedure
    .input(toolUserToursTourIdSchema)
    .query(async ({ input }) => {
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
