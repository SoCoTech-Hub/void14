import { getResourceById, getResources } from "@/lib/api/resources/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  resourceIdSchema,
  insertResourceParams,
  updateResourceParams,
} from "@/lib/db/schema/resources";
import { createResource, deleteResource, updateResource } from "@/lib/api/resources/mutations";

export const resourcesRouter = router({
  getResources: publicProcedure.query(async () => {
    return getResources();
  }),
  getResourceById: publicProcedure.input(resourceIdSchema).query(async ({ input }) => {
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
