import { getFilesReferenceById, getFilesReferences } from "@/lib/api/filesReferences/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  filesReferenceIdSchema,
  insertFilesReferenceParams,
  updateFilesReferenceParams,
} from "@/lib/db/schema/filesReferences";
import { createFilesReference, deleteFilesReference, updateFilesReference } from "@/lib/api/filesReferences/mutations";

export const filesReferencesRouter = router({
  getFilesReferences: publicProcedure.query(async () => {
    return getFilesReferences();
  }),
  getFilesReferenceById: publicProcedure.input(filesReferenceIdSchema).query(async ({ input }) => {
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
