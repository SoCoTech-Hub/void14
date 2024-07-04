import {
  createFileConversion,
  deleteFileConversion,
  updateFileConversion,
} from "../api/fileConversions/mutations";
import {
  getFileConversionById,
  getFileConversions,
} from "../api/fileConversions/queries";
import {
  fileConversionIdSchema,
  insertFileConversionParams,
  updateFileConversionParams,
} from "../db/schema/fileConversions";
import { publicProcedure, router } from "../server/trpc";

export const fileConversionsRouter = router({
  getFileConversions: publicProcedure.query(async () => {
    return getFileConversions();
  }),
  getFileConversionById: publicProcedure
    .input(fileConversionIdSchema)
    .query(async ({ input }) => {
      return getFileConversionById(input.id);
    }),
  createFileConversion: publicProcedure
    .input(insertFileConversionParams)
    .mutation(async ({ input }) => {
      return createFileConversion(input);
    }),
  updateFileConversion: publicProcedure
    .input(updateFileConversionParams)
    .mutation(async ({ input }) => {
      return updateFileConversion(input.id, input);
    }),
  deleteFileConversion: publicProcedure
    .input(fileConversionIdSchema)
    .mutation(async ({ input }) => {
      return deleteFileConversion(input.id);
    }),
});
