import { getFolderById, getFolders } from "../api/folders/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  folderIdSchema,
  insertFolderParams,
  updateFolderParams,
} from "@soco/file-db/schema/folders";
import { createFolder, deleteFolder, updateFolder } from "../api/folders/mutations";

export const foldersRouter =createTRPCRouter({
  getFolders: publicProcedure.query(async () => {
    return getFolders();
  }),
  getFolderById: publicProcedure.input(folderIdSchema).query(async ({ input }) => {
    return getFolderById(input.id);
  }),
  createFolder: publicProcedure
    .input(insertFolderParams)
    .mutation(async ({ input }) => {
      return createFolder(input);
    }),
  updateFolder: publicProcedure
    .input(updateFolderParams)
    .mutation(async ({ input }) => {
      return updateFolder(input.id, input);
    }),
  deleteFolder: publicProcedure
    .input(folderIdSchema)
    .mutation(async ({ input }) => {
      return deleteFolder(input.id);
    }),
});