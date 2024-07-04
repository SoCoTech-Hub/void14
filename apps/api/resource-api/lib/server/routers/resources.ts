import {
  createResource,
  deleteResource,
  updateResource,
} from "../api/resources/mutations";
import { getResourceById, getResources } from "../api/resources/queries";
import {
  insertResourceParams,
  resourceIdSchema,
  updateResourceParams,
} from "../db/schema/resources";
import { publicProcedure, router } from "../server/trpc";

export const resourcesRouter = router({
  getResources: publicProcedure.query(async () => {
    return getResources();
  }),
  getResourceById: publicProcedure
    .input(resourceIdSchema)
    .query(async ({ input }) => {
      return getResourceById(input.id);
    }),
  createResource: publicProcedure
    .input(insertResourceParams)
    .mutation(async ({ input }) => {
      return createResource(input);
    }),
  updateResource: publicProcedure
    .input(updateResourceParams)
    .mutation(async ({ input }) => {
      return updateResource(input.id, input);
    }),
  deleteResource: publicProcedure
    .input(resourceIdSchema)
    .mutation(async ({ input }) => {
      return deleteResource(input.id);
    }),
});
