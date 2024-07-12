import {
  h5pLibraryIdSchema,
  insertH5pLibraryParams,
  updateH5pLibraryParams,
} from "@soco/h5p-db/schema/h5pLibraries";

import {
  createH5pLibrary,
  deleteH5pLibrary,
  updateH5pLibrary,
} from "../api/h5pLibraries/mutations";
import {
  getH5pLibraries,
  getH5pLibraryById,
} from "../api/h5pLibraries/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const h5pLibrariesRouter = createTRPCRouter({
  getH5pLibraries: publicProcedure.query(async () => {
    return getH5pLibraries();
  }),
  getH5pLibraryById: publicProcedure
    .input(h5pLibraryIdSchema)
    .query(async ({ input }) => {
      return getH5pLibraryById(input.id);
    }),
  createH5pLibrary: publicProcedure
    .input(insertH5pLibraryParams)
    .mutation(async ({ input }) => {
      return createH5pLibrary(input);
    }),
  updateH5pLibrary: publicProcedure
    .input(updateH5pLibraryParams)
    .mutation(async ({ input }) => {
      return updateH5pLibrary(input.id, input);
    }),
  deleteH5pLibrary: publicProcedure
    .input(h5pLibraryIdSchema)
    .mutation(async ({ input }) => {
      return deleteH5pLibrary(input.id);
    }),
});
