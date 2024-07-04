import {
  createResourceOld,
  deleteResourceOld,
  updateResourceOld,
} from "../api/resourceOlds/mutations";
import {
  getResourceOldById,
  getResourceOlds,
} from "../api/resourceOlds/queries";
import {
  insertResourceOldParams,
  resourceOldIdSchema,
  updateResourceOldParams,
} from "../db/schema/resourceOlds";
import { publicProcedure, router } from "../server/trpc";

export const resourceOldsRouter = router({
  getResourceOlds: publicProcedure.query(async () => {
    return getResourceOlds();
  }),
  getResourceOldById: publicProcedure
    .input(resourceOldIdSchema)
    .query(async ({ input }) => {
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
