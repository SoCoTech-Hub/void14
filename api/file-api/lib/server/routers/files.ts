import { getFileById, getFiles } from "@/lib/api/files/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  fileIdSchema,
  insertFileParams,
  updateFileParams,
} from "@/lib/db/schema/files";
import { createFile, deleteFile, updateFile } from "@/lib/api/files/mutations";

export const filesRouter = router({
  getFiles: publicProcedure.query(async () => {
    return getFiles();
  }),
  getFileById: publicProcedure.input(fileIdSchema).query(async ({ input }) => {
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
