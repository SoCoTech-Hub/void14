import { getH5pLibrariesCachedassetById, getH5pLibrariesCachedassets } from "@/lib/api/h5pLibrariesCachedassets/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  h5pLibrariesCachedassetIdSchema,
  insertH5pLibrariesCachedassetParams,
  updateH5pLibrariesCachedassetParams,
} from "@/lib/db/schema/h5pLibrariesCachedassets";
import { createH5pLibrariesCachedasset, deleteH5pLibrariesCachedasset, updateH5pLibrariesCachedasset } from "@/lib/api/h5pLibrariesCachedassets/mutations";

export const h5pLibrariesCachedassetsRouter = router({
  getH5pLibrariesCachedassets: publicProcedure.query(async () => {
    return getH5pLibrariesCachedassets();
  }),
  getH5pLibrariesCachedassetById: publicProcedure.input(h5pLibrariesCachedassetIdSchema).query(async ({ input }) => {
    return getH5pLibrariesCachedassetById(input.id);
  }),
  createH5pLibrariesCachedasset: publicProcedure
    .input(insertH5pLibrariesCachedassetParams)
    .mutation(async ({ input }) => {
      return createH5pLibrariesCachedasset(input);
    }),
  updateH5pLibrariesCachedasset: publicProcedure
    .input(updateH5pLibrariesCachedassetParams)
    .mutation(async ({ input }) => {
      return updateH5pLibrariesCachedasset(input.id, input);
    }),
  deleteH5pLibrariesCachedasset: publicProcedure
    .input(h5pLibrariesCachedassetIdSchema)
    .mutation(async ({ input }) => {
      return deleteH5pLibrariesCachedasset(input.id);
    }),
});
