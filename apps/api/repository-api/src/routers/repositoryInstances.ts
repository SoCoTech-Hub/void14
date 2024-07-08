import { getRepositoryInstanceById, getRepositoryInstances } from "../api/repositoryInstances/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  repositoryInstanceIdSchema,
  insertRepositoryInstanceParams,
  updateRepositoryInstanceParams,
} from "@soco/repository-db/schema/repositoryInstances";
import { createRepositoryInstance, deleteRepositoryInstance, updateRepositoryInstance } from "../api/repositoryInstances/mutations";

export const repositoryInstancesRouter =createTRPCRouter({
  getRepositoryInstances: publicProcedure.query(async () => {
    return getRepositoryInstances();
  }),
  getRepositoryInstanceById: publicProcedure.input(repositoryInstanceIdSchema).query(async ({ input }) => {
    return getRepositoryInstanceById(input.id);
  }),
  createRepositoryInstance: publicProcedure
    .input(insertRepositoryInstanceParams)
    .mutation(async ({ input }) => {
      return createRepositoryInstance(input);
    }),
  updateRepositoryInstance: publicProcedure
    .input(updateRepositoryInstanceParams)
    .mutation(async ({ input }) => {
      return updateRepositoryInstance(input.id, input);
    }),
  deleteRepositoryInstance: publicProcedure
    .input(repositoryInstanceIdSchema)
    .mutation(async ({ input }) => {
      return deleteRepositoryInstance(input.id);
    }),
});
