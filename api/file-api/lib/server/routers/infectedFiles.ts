import { getInfectedFileById, getInfectedFiles } from "@/lib/api/infectedFiles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  infectedFileIdSchema,
  insertInfectedFileParams,
  updateInfectedFileParams,
} from "@/lib/db/schema/infectedFiles";
import { createInfectedFile, deleteInfectedFile, updateInfectedFile } from "@/lib/api/infectedFiles/mutations";

export const infectedFilesRouter = router({
  getInfectedFiles: publicProcedure.query(async () => {
    return getInfectedFiles();
  }),
  getInfectedFileById: publicProcedure.input(infectedFileIdSchema).query(async ({ input }) => {
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
