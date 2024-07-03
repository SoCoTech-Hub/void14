import { getFolderById, getFolders } from "@/lib/api/folders/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  folderIdSchema,
  insertFolderParams,
  updateFolderParams,
} from "@/lib/db/schema/folders";
import { createFolder, deleteFolder, updateFolder } from "@/lib/api/folders/mutations";

export const foldersRouter = router({
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
