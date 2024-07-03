import { getMnetRemoteRpcById, getMnetRemoteRpc } from "@/lib/api/mnetRemoteRpc/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetRemoteRpcIdSchema,
  insertMnetRemoteRpcParams,
  updateMnetRemoteRpcParams,
} from "@/lib/db/schema/mnetRemoteRpc";
import { createMnetRemoteRpc, deleteMnetRemoteRpc, updateMnetRemoteRpc } from "@/lib/api/mnetRemoteRpc/mutations";

export const mnetRemoteRpcRouter = router({
  getMnetRemoteRpc: publicProcedure.query(async () => {
    return getMnetRemoteRpc();
  }),
  getMnetRemoteRpcById: publicProcedure.input(mnetRemoteRpcIdSchema).query(async ({ input }) => {
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
