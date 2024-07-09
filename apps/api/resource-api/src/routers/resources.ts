import { getResourceById, getResources } from "../api/resources/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  resourceIdSchema,
  insertResourceParams,
  updateResourceParams,
} from "@soco/resource-db/schema/resources";
import { createResource, deleteResource, updateResource } from "../api/resources/mutations";

export const resourcesRouter =createTRPCRouter({
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