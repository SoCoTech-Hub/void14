import {
  insertRepositoryParams,
  repositoryIdSchema,
  updateRepositoryParams,
} from "@soco/repository-db/schema/repositories";

import {
  createRepository,
  deleteRepository,
  updateRepository,
} from "../api/repositories/mutations";
import {
  getRepositories,
  getRepositoryById,
} from "../api/repositories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const repositoriesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
