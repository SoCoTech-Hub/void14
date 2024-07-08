import { getGlossaryAliasById, getGlossaryAliases } from "../api/glossaryAliases/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  glossaryAliasIdSchema,
  insertGlossaryAliasParams,
  updateGlossaryAliasParams,
} from "@soco/glossary-db/schema/glossaryAliases";
import { createGlossaryAlias, deleteGlossaryAlias, updateGlossaryAlias } from "../api/glossaryAliases/mutations";

export const glossaryAliasesRouter =createTRPCRouter({
  getGlossaryAliases: publicProcedure.query(async () => {
    return getGlossaryAliases();
  }),
  getGlossaryAliasById: publicProcedure.input(glossaryAliasIdSchema).query(async ({ input }) => {
    return getGlossaryAliasById(input.id);
  }),
  createGlossaryAlias: publicProcedure
    .input(insertGlossaryAliasParams)
    .mutation(async ({ input }) => {
      return createGlossaryAlias(input);
    }),
  updateGlossaryAlias: publicProcedure
    .input(updateGlossaryAliasParams)
    .mutation(async ({ input }) => {
      return updateGlossaryAlias(input.id, input);
    }),
  deleteGlossaryAlias: publicProcedure
    .input(glossaryAliasIdSchema)
    .mutation(async ({ input }) => {
      return deleteGlossaryAlias(input.id);
    }),
});
