import {
  insertMnetRemoteRpcParams,
  mnetRemoteRpcIdSchema,
  updateMnetRemoteRpcParams,
} from "@soco/mnet-db/schema/mnetRemoteRpc";

import {
  createMnetRemoteRpc,
  deleteMnetRemoteRpc,
  updateMnetRemoteRpc,
} from "../api/mnetRemoteRpc/mutations";
import {
  getMnetRemoteRpc,
  getMnetRemoteRpcById,
} from "../api/mnetRemoteRpc/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mnetRemoteRpcRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getMnetRemoteRpc: publicProcedure.query(async () => {
      return getMnetRemoteRpc();
    }),
    getMnetRemoteRpcById: publicProcedure
      .input(mnetRemoteRpcIdSchema)
      .query(async ({ input }) => {
        return getMnetRemoteRpcById(input.id);
      }),
    createMnetRemoteRpc: publicProcedure
      .input(insertMnetRemoteRpcParams)
      .mutation(async ({ input }) => {
        return createMnetRemoteRpc(input);
      }),
    updateMnetRemoteRpc: publicProcedure
      .input(updateMnetRemoteRpcParams)
      .mutation(async ({ input }) => {
        return updateMnetRemoteRpc(input.id, input);
      }),
    deleteMnetRemoteRpc: publicProcedure
      .input(mnetRemoteRpcIdSchema)
      .mutation(async ({ input }) => {
        return deleteMnetRemoteRpc(input.id);
      }),
  });
