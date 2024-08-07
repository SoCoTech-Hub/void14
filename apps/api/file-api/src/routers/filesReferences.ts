import {
  filesReferenceIdSchema,
  insertFilesReferenceParams,
  updateFilesReferenceParams,
} from "@soco/file-db/schema/filesReferences";

import {
  createFilesReference,
  deleteFilesReference,
  updateFilesReference,
} from "../api/filesReferences/mutations";
import {
  getFilesReferenceById,
  getFilesReferences,
} from "../api/filesReferences/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const filesReferencesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getFilesReferences: publicProcedure.query(async () => {
      return getFilesReferences();
    }),
    getFilesReferenceById: publicProcedure
      .input(filesReferenceIdSchema)
      .query(async ({ input }) => {
        return getFilesReferenceById(input.id);
      }),
    createFilesReference: publicProcedure
      .input(insertFilesReferenceParams)
      .mutation(async ({ input }) => {
        return createFilesReference(input);
      }),
    updateFilesReference: publicProcedure
      .input(updateFilesReferenceParams)
      .mutation(async ({ input }) => {
        return updateFilesReference(input.id, input);
      }),
    deleteFilesReference: publicProcedure
      .input(filesReferenceIdSchema)
      .mutation(async ({ input }) => {
        return deleteFilesReference(input.id);
      }),
  });
