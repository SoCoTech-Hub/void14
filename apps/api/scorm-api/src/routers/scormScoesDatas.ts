import { getScormScoesDataById, getScormScoesDatas } from "../api/scormScoesDatas/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  scormScoesDataIdSchema,
  insertScormScoesDataParams,
  updateScormScoesDataParams,
} from "@soco/scorm-db/schema/scormScoesDatas";
import { createScormScoesData, deleteScormScoesData, updateScormScoesData } from "../api/scormScoesDatas/mutations";

export const scormScoesDatasRouter =createTRPCRouter({
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
