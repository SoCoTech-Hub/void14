import {
  createFilesReference,
  deleteFilesReference,
  updateFilesReference,
} from "../api/filesReferences/mutations";
import {
  getFilesReferenceById,
  getFilesReferences,
} from "../api/filesReferences/queries";
import {
  filesReferenceIdSchema,
  insertFilesReferenceParams,
  updateFilesReferenceParams,
} from "../db/schema/filesReferences";
import { publicProcedure, router } from "../server/trpc";

export const filesReferencesRouter = router({
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
