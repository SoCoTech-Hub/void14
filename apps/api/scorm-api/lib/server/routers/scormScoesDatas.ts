import {
  createScormScoesData,
  deleteScormScoesData,
  updateScormScoesData,
} from "../api/scormScoesDatas/mutations";
import {
  getScormScoesDataById,
  getScormScoesDatas,
} from "../api/scormScoesDatas/queries";
import {
  insertScormScoesDataParams,
  scormScoesDataIdSchema,
  updateScormScoesDataParams,
} from "../db/schema/scormScoesDatas";
import { publicProcedure, router } from "../server/trpc";

export const scormScoesDatasRouter = router({
  getScormScoesDatas: publicProcedure.query(async () => {
    return getScormScoesDatas();
  }),
  getScormScoesDataById: publicProcedure
    .input(scormScoesDataIdSchema)
    .query(async ({ input }) => {
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
