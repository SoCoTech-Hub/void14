import { getResourceOldById, getResourceOlds } from "@/lib/api/resourceOlds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  resourceOldIdSchema,
  insertResourceOldParams,
  updateResourceOldParams,
} from "@/lib/db/schema/resourceOlds";
import { createResourceOld, deleteResourceOld, updateResourceOld } from "@/lib/api/resourceOlds/mutations";

export const resourceOldsRouter = router({
  getResourceOlds: publicProcedure.query(async () => {
    return getResourceOlds();
  }),
  getResourceOldById: publicProcedure.input(resourceOldIdSchema).query(async ({ input }) => {
    return getResourceOldById(input.id);
  }),
  createResourceOld: publicProcedure
    .input(insertResourceOldParams)
    .mutation(async ({ input }) => {
      return createResourceOld(input);
    }),
  updateResourceOld: publicProcedure
    .input(updateResourceOldParams)
    .mutation(async ({ input }) => {
      return updateResourceOld(input.id, input);
    }),
  deleteResourceOld: publicProcedure
    .input(resourceOldIdSchema)
    .mutation(async ({ input }) => {
      return deleteResourceOld(input.id);
    }),
});
