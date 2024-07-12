import {
  h5pContentsLibraryIdSchema,
  insertH5pContentsLibraryParams,
  updateH5pContentsLibraryParams,
} from "@soco/h5p-db/schema/h5pContentsLibraries";

import {
  createH5pContentsLibrary,
  deleteH5pContentsLibrary,
  updateH5pContentsLibrary,
} from "../api/h5pContentsLibraries/mutations";
import {
  getH5pContentsLibraries,
  getH5pContentsLibraryById,
} from "../api/h5pContentsLibraries/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const h5pContentsLibrariesRouter = createTRPCRouter({
  getH5pContentsLibraries: publicProcedure.query(async () => {
    return getH5pContentsLibraries();
  }),
  getH5pContentsLibraryById: publicProcedure
    .input(h5pContentsLibraryIdSchema)
    .query(async ({ input }) => {
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
