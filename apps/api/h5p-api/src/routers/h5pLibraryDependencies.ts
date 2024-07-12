import {
  h5pLibraryDependencyIdSchema,
  insertH5pLibraryDependencyParams,
  updateH5pLibraryDependencyParams,
} from "@soco/h5p-db/schema/h5pLibraryDependencies";

import {
  createH5pLibraryDependency,
  deleteH5pLibraryDependency,
  updateH5pLibraryDependency,
} from "../api/h5pLibraryDependencies/mutations";
import {
  getH5pLibraryDependencies,
  getH5pLibraryDependencyById,
} from "../api/h5pLibraryDependencies/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const h5pLibraryDependenciesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getH5pLibraryDependencies: publicProcedure.query(async () => {
      return getH5pLibraryDependencies();
    }),
    getH5pLibraryDependencyById: publicProcedure
      .input(h5pLibraryDependencyIdSchema)
      .query(async ({ input }) => {
        return getH5pLibraryDependencyById(input.id);
      }),
    createH5pLibraryDependency: publicProcedure
      .input(insertH5pLibraryDependencyParams)
      .mutation(async ({ input }) => {
        return createH5pLibraryDependency(input);
      }),
    updateH5pLibraryDependency: publicProcedure
      .input(updateH5pLibraryDependencyParams)
      .mutation(async ({ input }) => {
        return updateH5pLibraryDependency(input.id, input);
      }),
    deleteH5pLibraryDependency: publicProcedure
      .input(h5pLibraryDependencyIdSchema)
      .mutation(async ({ input }) => {
        return deleteH5pLibraryDependency(input.id);
      }),
  });
