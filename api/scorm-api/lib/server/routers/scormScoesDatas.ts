import { getScormScoesDataById, getScormScoesDatas } from "@/lib/api/scormScoesDatas/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scormScoesDataIdSchema,
  insertScormScoesDataParams,
  updateScormScoesDataParams,
} from "@/lib/db/schema/scormScoesDatas";
import { createScormScoesData, deleteScormScoesData, updateScormScoesData } from "@/lib/api/scormScoesDatas/mutations";

export const scormScoesDatasRouter = router({
  getScormScoesDatas: publicProcedure.query(async () => {
    return getScormScoesDatas();
  }),
  getScormScoesDataById: publicProcedure.input(scormScoesDataIdSchema).query(async ({ input }) => {
    return getScormScoesDataById(input.id);
  }),
  createScormScoesData: publicProcedure
    .input(insertScormScoesDataParams)
    .mutation(async ({ input }) => {
      return createScormScoesData(input);
    }),
  updateScormScoesData: publicProcedure
    .input(updateScormScoesDataParams)
    .mutation(async ({ input }) => {
      return updateScormScoesData(input.id, input);
    }),
  deleteScormScoesData: publicProcedure
    .input(scormScoesDataIdSchema)
    .mutation(async ({ input }) => {
      return deleteScormScoesData(input.id);
    }),
});
