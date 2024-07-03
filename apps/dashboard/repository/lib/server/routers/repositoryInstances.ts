import { getRepositoryInstanceById, getRepositoryInstances } from "@/lib/api/repositoryInstances/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  repositoryInstanceIdSchema,
  insertRepositoryInstanceParams,
  updateRepositoryInstanceParams,
} from "@/lib/db/schema/repositoryInstances";
import { createRepositoryInstance, deleteRepositoryInstance, updateRepositoryInstance } from "@/lib/api/repositoryInstances/mutations";

export const repositoryInstancesRouter = router({
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
