import {
  fileConversionIdSchema,
  insertFileConversionParams,
  updateFileConversionParams,
} from "@soco/file-db/schema/fileConversions";

import {
  createFileConversion,
  deleteFileConversion,
  updateFileConversion,
} from "../api/fileConversions/mutations";
import {
  getFileConversionById,
  getFileConversions,
} from "../api/fileConversions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const fileConversionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
