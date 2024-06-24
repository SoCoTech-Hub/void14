import { getAnalyticsUsedFileById, getAnalyticsUsedFiles } from "@/lib/api/analyticsUsedFiles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsUsedFileIdSchema,
  insertAnalyticsUsedFileParams,
  updateAnalyticsUsedFileParams,
} from "@/lib/db/schema/analyticsUsedFiles";
import { createAnalyticsUsedFile, deleteAnalyticsUsedFile, updateAnalyticsUsedFile } from "@/lib/api/analyticsUsedFiles/mutations";

export const analyticsUsedFilesRouter = router({
  getAnalyticsUsedFiles: publicProcedure.query(async () => {
    return getAnalyticsUsedFiles();
  }),
  getAnalyticsUsedFileById: publicProcedure.input(analyticsUsedFileIdSchema).query(async ({ input }) => {
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
