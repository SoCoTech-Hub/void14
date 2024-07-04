import {
  createGlossaryFormat,
  deleteGlossaryFormat,
  updateGlossaryFormat,
} from "../api/glossaryFormats/mutations";
import {
  getGlossaryFormatById,
  getGlossaryFormats,
} from "../api/glossaryFormats/queries";
import {
  glossaryFormatIdSchema,
  insertGlossaryFormatParams,
  updateGlossaryFormatParams,
} from "../db/schema/glossaryFormats";
import { publicProcedure, router } from "../server/trpc";

export const glossaryFormatsRouter = router({
  getGlossaryFormats: publicProcedure.query(async () => {
    return getGlossaryFormats();
  }),
  getGlossaryFormatById: publicProcedure
    .input(glossaryFormatIdSchema)
    .query(async ({ input }) => {
      return getGlossaryFormatById(input.id);
    }),
  createGlossaryFormat: publicProcedure
    .input(insertGlossaryFormatParams)
    .mutation(async ({ input }) => {
      return createGlossaryFormat(input);
    }),
  updateGlossaryFormat: publicProcedure
    .input(updateGlossaryFormatParams)
    .mutation(async ({ input }) => {
      return updateGlossaryFormat(input.id, input);
    }),
  deleteGlossaryFormat: publicProcedure
    .input(glossaryFormatIdSchema)
    .mutation(async ({ input }) => {
      return deleteGlossaryFormat(input.id);
    }),
});
