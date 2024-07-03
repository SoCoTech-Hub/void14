import { getGlossaryById, getGlossaries } from "@/lib/api/glossaries/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  glossaryIdSchema,
  insertGlossaryParams,
  updateGlossaryParams,
} from "@/lib/db/schema/glossaries";
import { createGlossary, deleteGlossary, updateGlossary } from "@/lib/api/glossaries/mutations";

export const glossariesRouter = router({
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
