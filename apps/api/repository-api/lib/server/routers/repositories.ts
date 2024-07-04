import {
  createRepository,
  deleteRepository,
  updateRepository,
} from "../api/repositories/mutations";
import {
  getRepositories,
  getRepositoryById,
} from "../api/repositories/queries";
import {
  insertRepositoryParams,
  repositoryIdSchema,
  updateRepositoryParams,
} from "../db/schema/repositories";
import { publicProcedure, router } from "../server/trpc";

export const repositoriesRouter = router({
  getRepositories: publicProcedure.query(async () => {
    return getRepositories();
  }),
  getRepositoryById: publicProcedure
    .input(repositoryIdSchema)
    .query(async ({ input }) => {
      return getRepositoryById(input.id);
    }),
  createRepository: publicProcedure
    .input(insertRepositoryParams)
    .mutation(async ({ input }) => {
      return createRepository(input);
    }),
  updateRepository: publicProcedure
    .input(updateRepositoryParams)
    .mutation(async ({ input }) => {
      return updateRepository(input.id, input);
    }),
  deleteRepository: publicProcedure
    .input(repositoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteRepository(input.id);
    }),
});
