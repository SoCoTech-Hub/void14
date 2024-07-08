import { getGlossaryById, getGlossaries } from "../api/glossaries/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  glossaryIdSchema,
  insertGlossaryParams,
  updateGlossaryParams,
} from "@soco/glossary-db/schema/glossaries";
import { createGlossary, deleteGlossary, updateGlossary } from "../api/glossaries/mutations";

export const glossariesRouter =createTRPCRouter({
  getGlossaries: publicProcedure.query(async () => {
    return getGlossaries();
  }),
  getGlossaryById: publicProcedure.input(glossaryIdSchema).query(async ({ input }) => {
    return getGlossaryById(input.id);
  }),
  createGlossary: publicProcedure
    .input(insertGlossaryParams)
    .mutation(async ({ input }) => {
      return createGlossary(input);
    }),
  updateGlossary: publicProcedure
    .input(updateGlossaryParams)
    .mutation(async ({ input }) => {
      return updateGlossary(input.id, input);
    }),
  deleteGlossary: publicProcedure
    .input(glossaryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGlossary(input.id);
    }),
});
