import {
  createRepositoryInstance,
  deleteRepositoryInstance,
  updateRepositoryInstance,
} from "../api/repositoryInstances/mutations";
import {
  getRepositoryInstanceById,
  getRepositoryInstances,
} from "../api/repositoryInstances/queries";
import {
  insertRepositoryInstanceParams,
  repositoryInstanceIdSchema,
  updateRepositoryInstanceParams,
} from "../db/schema/repositoryInstances";
import { publicProcedure, router } from "../server/trpc";

export const repositoryInstancesRouter = router({
  getRepositoryInstances: publicProcedure.query(async () => {
    return getRepositoryInstances();
  }),
  getRepositoryInstanceById: publicProcedure
    .input(repositoryInstanceIdSchema)
    .query(async ({ input }) => {
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
