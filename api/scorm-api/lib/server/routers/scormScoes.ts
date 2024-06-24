import { getScormScoeById, getScormScoes } from "@/lib/api/scormScoes/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scormScoeIdSchema,
  insertScormScoeParams,
  updateScormScoeParams,
} from "@/lib/db/schema/scormScoes";
import { createScormScoe, deleteScormScoe, updateScormScoe } from "@/lib/api/scormScoes/mutations";

export const scormScoesRouter = router({
  getScormScoes: publicProcedure.query(async () => {
    return getScormScoes();
  }),
  getScormScoeById: publicProcedure.input(scormScoeIdSchema).query(async ({ input }) => {
    return getScormScoeById(input.id);
  }),
  createScormScoe: publicProcedure
    .input(insertScormScoeParams)
    .mutation(async ({ input }) => {
      return createScormScoe(input);
    }),
  updateScormScoe: publicProcedure
    .input(updateScormScoeParams)
    .mutation(async ({ input }) => {
      return updateScormScoe(input.id, input);
    }),
  deleteScormScoe: publicProcedure
    .input(scormScoeIdSchema)
    .mutation(async ({ input }) => {
      return deleteScormScoe(input.id);
    }),
});
