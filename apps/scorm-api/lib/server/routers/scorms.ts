import { getScormById, getScorms } from "@/lib/api/scorms/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scormIdSchema,
  insertScormParams,
  updateScormParams,
} from "@/lib/db/schema/scorms";
import { createScorm, deleteScorm, updateScorm } from "@/lib/api/scorms/mutations";

export const scormsRouter = router({
  getScorms: publicProcedure.query(async () => {
    return getScorms();
  }),
  getScormById: publicProcedure.input(scormIdSchema).query(async ({ input }) => {
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
