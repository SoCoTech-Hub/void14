import {
  insertScormScoeParams,
  scormScoeIdSchema,
  updateScormScoeParams,
} from "@soco/scorm-db/schema/scormScoes";

import {
  createScormScoe,
  deleteScormScoe,
  updateScormScoe,
} from "../api/scormScoes/mutations";
import { getScormScoeById, getScormScoes } from "../api/scormScoes/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scormScoesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getScormScoes: publicProcedure.query(async () => {
      return getScormScoes();
    }),
    getScormScoeById: publicProcedure
      .input(scormScoeIdSchema)
      .query(async ({ input }) => {
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
