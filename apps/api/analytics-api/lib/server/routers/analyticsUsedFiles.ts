import {
  createAnalyticsUsedFile,
  deleteAnalyticsUsedFile,
  updateAnalyticsUsedFile,
} from "../api/analyticsUsedFiles/mutations";
import {
  getAnalyticsUsedFileById,
  getAnalyticsUsedFiles,
} from "../api/analyticsUsedFiles/queries";
import {
  analyticsUsedFileIdSchema,
  insertAnalyticsUsedFileParams,
  updateAnalyticsUsedFileParams,
} from "../db/schema/analyticsUsedFiles";
import { publicProcedure, router } from "../server/trpc";

export const analyticsUsedFilesRouter = router({
  getAnalyticsUsedFiles: publicProcedure.query(async () => {
    return getAnalyticsUsedFiles();
  }),
  getAnalyticsUsedFileById: publicProcedure
    .input(analyticsUsedFileIdSchema)
    .query(async ({ input }) => {
      return getAnalyticsUsedFileById(input.id);
    }),
  createAnalyticsUsedFile: publicProcedure
    .input(insertAnalyticsUsedFileParams)
    .mutation(async ({ input }) => {
      return createAnalyticsUsedFile(input);
    }),
  updateAnalyticsUsedFile: publicProcedure
    .input(updateAnalyticsUsedFileParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsUsedFile(input.id, input);
    }),
  deleteAnalyticsUsedFile: publicProcedure
    .input(analyticsUsedFileIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsUsedFile(input.id);
    }),
});
