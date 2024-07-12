import {
  insertResourceOldParams,
  resourceOldIdSchema,
  updateResourceOldParams,
} from "@soco/resource-db/schema/resourceOlds";

import {
  createResourceOld,
  deleteResourceOld,
  updateResourceOld,
} from "../api/resourceOlds/mutations";
import {
  getResourceOldById,
  getResourceOlds,
} from "../api/resourceOlds/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const resourceOldsRouter = createTRPCRouter({
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
