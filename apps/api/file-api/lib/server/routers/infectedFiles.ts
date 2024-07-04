import {
  createInfectedFile,
  deleteInfectedFile,
  updateInfectedFile,
} from "../api/infectedFiles/mutations";
import {
  getInfectedFileById,
  getInfectedFiles,
} from "../api/infectedFiles/queries";
import {
  infectedFileIdSchema,
  insertInfectedFileParams,
  updateInfectedFileParams,
} from "../db/schema/infectedFiles";
import { publicProcedure, router } from "../server/trpc";

export const infectedFilesRouter = router({
  getInfectedFiles: publicProcedure.query(async () => {
    return getInfectedFiles();
  }),
  getInfectedFileById: publicProcedure
    .input(infectedFileIdSchema)
    .query(async ({ input }) => {
      return getInfectedFileById(input.id);
    }),
  createInfectedFile: publicProcedure
    .input(insertInfectedFileParams)
    .mutation(async ({ input }) => {
      return createInfectedFile(input);
    }),
  updateInfectedFile: publicProcedure
    .input(updateInfectedFileParams)
    .mutation(async ({ input }) => {
      return updateInfectedFile(input.id, input);
    }),
  deleteInfectedFile: publicProcedure
    .input(infectedFileIdSchema)
    .mutation(async ({ input }) => {
      return deleteInfectedFile(input.id);
    }),
});
