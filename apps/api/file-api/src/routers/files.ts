import {
  fileIdSchema,
  insertFileParams,
  updateFileParams,
} from "@soco/file-db/schema/files";

import { createFile, deleteFile, updateFile } from "../api/files/mutations";
import { getFileById, getFiles } from "../api/files/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const filesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getFiles: publicProcedure.query(async () => {
      return getFiles();
    }),
    getFileById: publicProcedure
      .input(fileIdSchema)
      .query(async ({ input }) => {
        return getFileById(input.id);
      }),
    createFile: publicProcedure
      .input(insertFileParams)
      .mutation(async ({ input }) => {
        return createFile(input);
      }),
    updateFile: publicProcedure
      .input(updateFileParams)
      .mutation(async ({ input }) => {
        return updateFile(input.id, input);
      }),
    deleteFile: publicProcedure
      .input(fileIdSchema)
      .mutation(async ({ input }) => {
        return deleteFile(input.id);
      }),
  });
