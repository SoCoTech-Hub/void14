import { createScorm, deleteScorm, updateScorm } from "../api/scorms/mutations";
import { getScormById, getScorms } from "../api/scorms/queries";
import {
  insertScormParams,
  scormIdSchema,
  updateScormParams,
} from "../db/schema/scorms";
import { publicProcedure, router } from "../server/trpc";

export const scormsRouter = router({
  getScorms: publicProcedure.query(async () => {
    return getScorms();
  }),
  getScormById: publicProcedure
    .input(scormIdSchema)
    .query(async ({ input }) => {
      return getScormById(input.id);
    }),
  createScorm: publicProcedure
    .input(insertScormParams)
    .mutation(async ({ input }) => {
      return createScorm(input);
    }),
  updateScorm: publicProcedure
    .input(updateScormParams)
    .mutation(async ({ input }) => {
      return updateScorm(input.id, input);
    }),
  deleteScorm: publicProcedure
    .input(scormIdSchema)
    .mutation(async ({ input }) => {
      return deleteScorm(input.id);
    }),
});
