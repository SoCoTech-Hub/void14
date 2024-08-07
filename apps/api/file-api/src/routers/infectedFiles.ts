import {
  infectedFileIdSchema,
  insertInfectedFileParams,
  updateInfectedFileParams,
} from "@soco/file-db/schema/infectedFiles";

import {
  createInfectedFile,
  deleteInfectedFile,
  updateInfectedFile,
} from "../api/infectedFiles/mutations";
import {
  getInfectedFileById,
  getInfectedFiles,
} from "../api/infectedFiles/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const infectedFilesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
