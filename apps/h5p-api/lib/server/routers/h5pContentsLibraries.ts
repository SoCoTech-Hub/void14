import { getH5pContentsLibraryById, getH5pContentsLibraries } from "@/lib/api/h5pContentsLibraries/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  h5pContentsLibraryIdSchema,
  insertH5pContentsLibraryParams,
  updateH5pContentsLibraryParams,
} from "@/lib/db/schema/h5pContentsLibraries";
import { createH5pContentsLibrary, deleteH5pContentsLibrary, updateH5pContentsLibrary } from "@/lib/api/h5pContentsLibraries/mutations";

export const h5pContentsLibrariesRouter = router({
  getH5pContentsLibraries: publicProcedure.query(async () => {
    return getH5pContentsLibraries();
  }),
  getH5pContentsLibraryById: publicProcedure.input(h5pContentsLibraryIdSchema).query(async ({ input }) => {
    return getH5pContentsLibraryById(input.id);
  }),
  createH5pContentsLibrary: publicProcedure
    .input(insertH5pContentsLibraryParams)
    .mutation(async ({ input }) => {
      return createH5pContentsLibrary(input);
    }),
  updateH5pContentsLibrary: publicProcedure
    .input(updateH5pContentsLibraryParams)
    .mutation(async ({ input }) => {
      return updateH5pContentsLibrary(input.id, input);
    }),
  deleteH5pContentsLibrary: publicProcedure
    .input(h5pContentsLibraryIdSchema)
    .mutation(async ({ input }) => {
      return deleteH5pContentsLibrary(input.id);
    }),
});
