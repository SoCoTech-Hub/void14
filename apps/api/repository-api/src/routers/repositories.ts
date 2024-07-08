import { getRepositoryById, getRepositories } from "../api/repositories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  repositoryIdSchema,
  insertRepositoryParams,
  updateRepositoryParams,
} from "@soco/repository-db/schema/repositories";
import { createRepository, deleteRepository, updateRepository } from "../api/repositories/mutations";

export const repositoriesRouter =createTRPCRouter({
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
