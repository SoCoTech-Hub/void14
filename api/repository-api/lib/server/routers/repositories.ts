import { getRepositoryById, getRepositories } from "@/lib/api/repositories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  repositoryIdSchema,
  insertRepositoryParams,
  updateRepositoryParams,
} from "@/lib/db/schema/repositories";
import { createRepository, deleteRepository, updateRepository } from "@/lib/api/repositories/mutations";

export const repositoriesRouter = router({
  getRepositories: publicProcedure.query(async () => {
    return getRepositories();
  }),
  getRepositoryById: publicProcedure.input(repositoryIdSchema).query(async ({ input }) => {
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
