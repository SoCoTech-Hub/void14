import {
  createMnetRemoteRpc,
  deleteMnetRemoteRpc,
  updateMnetRemoteRpc,
} from "../api/mnetRemoteRpc/mutations";
import {
  getMnetRemoteRpc,
  getMnetRemoteRpcById,
} from "../api/mnetRemoteRpc/queries";
import {
  insertMnetRemoteRpcParams,
  mnetRemoteRpcIdSchema,
  updateMnetRemoteRpcParams,
} from "../db/schema/mnetRemoteRpc";
import { publicProcedure, router } from "../server/trpc";

export const mnetRemoteRpcRouter = router({
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
