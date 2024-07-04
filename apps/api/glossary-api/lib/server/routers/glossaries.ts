import {
  createGlossary,
  deleteGlossary,
  updateGlossary,
} from "../api/glossaries/mutations";
import { getGlossaries, getGlossaryById } from "../api/glossaries/queries";
import {
  glossaryIdSchema,
  insertGlossaryParams,
  updateGlossaryParams,
} from "../db/schema/glossaries";
import { publicProcedure, router } from "../server/trpc";

export const glossariesRouter = router({
  getGlossaries: publicProcedure.query(async () => {
    return getGlossaries();
  }),
  getGlossaryById: publicProcedure
    .input(glossaryIdSchema)
    .query(async ({ input }) => {
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
