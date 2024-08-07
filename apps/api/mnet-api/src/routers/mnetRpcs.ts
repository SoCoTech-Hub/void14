import {
  insertMnetRpcParams,
  mnetRpcIdSchema,
  updateMnetRpcParams,
} from "@soco/mnet-db/schema/mnetRpcs";

import {
  createMnetRpc,
  deleteMnetRpc,
  updateMnetRpc,
} from "../api/mnetRpcs/mutations";
import { getMnetRpcById, getMnetRpcs } from "../api/mnetRpcs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mnetRpcsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getMnetRpcs: publicProcedure.query(async () => {
      return getMnetRpcs();
    }),
    getMnetRpcById: publicProcedure
      .input(mnetRpcIdSchema)
      .query(async ({ input }) => {
        return getMnetRpcById(input.id);
      }),
    createMnetRpc: publicProcedure
      .input(insertMnetRpcParams)
      .mutation(async ({ input }) => {
        return createMnetRpc(input);
      }),
    updateMnetRpc: publicProcedure
      .input(updateMnetRpcParams)
      .mutation(async ({ input }) => {
        return updateMnetRpc(input.id, input);
      }),
    deleteMnetRpc: publicProcedure
      .input(mnetRpcIdSchema)
      .mutation(async ({ input }) => {
        return deleteMnetRpc(input.id);
      }),
  });
