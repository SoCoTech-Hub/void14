import { getGlossaryFormatById, getGlossaryFormats } from "@/lib/api/glossaryFormats/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  glossaryFormatIdSchema,
  insertGlossaryFormatParams,
  updateGlossaryFormatParams,
} from "@/lib/db/schema/glossaryFormats";
import { createGlossaryFormat, deleteGlossaryFormat, updateGlossaryFormat } from "@/lib/api/glossaryFormats/mutations";

export const glossaryFormatsRouter = router({
  getGlossaryFormats: publicProcedure.query(async () => {
    return getGlossaryFormats();
  }),
  getGlossaryFormatById: publicProcedure.input(glossaryFormatIdSchema).query(async ({ input }) => {
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
