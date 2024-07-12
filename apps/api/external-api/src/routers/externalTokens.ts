import {
  externalTokenIdSchema,
  insertExternalTokenParams,
  updateExternalTokenParams,
} from "@soco/external-db/schema/externalTokens";

import {
  createExternalToken,
  deleteExternalToken,
  updateExternalToken,
} from "../api/externalTokens/mutations";
import {
  getExternalTokenById,
  getExternalTokens,
} from "../api/externalTokens/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const externalTokensRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getExternalTokens: publicProcedure.query(async () => {
      return getExternalTokens();
    }),
    getExternalTokenById: publicProcedure
      .input(externalTokenIdSchema)
      .query(async ({ input }) => {
        return getExternalTokenById(input.id);
      }),
    createExternalToken: publicProcedure
      .input(insertExternalTokenParams)
      .mutation(async ({ input }) => {
        return createExternalToken(input);
      }),
    updateExternalToken: publicProcedure
      .input(updateExternalTokenParams)
      .mutation(async ({ input }) => {
        return updateExternalToken(input.id, input);
      }),
    deleteExternalToken: publicProcedure
      .input(externalTokenIdSchema)
      .mutation(async ({ input }) => {
        return deleteExternalToken(input.id);
      }),
  });
