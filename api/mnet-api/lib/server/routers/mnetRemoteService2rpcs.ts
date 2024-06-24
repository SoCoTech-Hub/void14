import { getMnetRemoteService2rpcById, getMnetRemoteService2rpcs } from "@/lib/api/mnetRemoteService2rpcs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetRemoteService2rpcIdSchema,
  insertMnetRemoteService2rpcParams,
  updateMnetRemoteService2rpcParams,
} from "@/lib/db/schema/mnetRemoteService2rpcs";
import { createMnetRemoteService2rpc, deleteMnetRemoteService2rpc, updateMnetRemoteService2rpc } from "@/lib/api/mnetRemoteService2rpcs/mutations";

export const mnetRemoteService2rpcsRouter = router({
  getMnetRemoteService2rpcs: publicProcedure.query(async () => {
    return getMnetRemoteService2rpcs();
  }),
  getMnetRemoteService2rpcById: publicProcedure.input(mnetRemoteService2rpcIdSchema).query(async ({ input }) => {
    return getMnetRemoteService2rpcById(input.id);
  }),
  createMnetRemoteService2rpc: publicProcedure
    .input(insertMnetRemoteService2rpcParams)
    .mutation(async ({ input }) => {
      return createMnetRemoteService2rpc(input);
    }),
  updateMnetRemoteService2rpc: publicProcedure
    .input(updateMnetRemoteService2rpcParams)
    .mutation(async ({ input }) => {
      return updateMnetRemoteService2rpc(input.id, input);
    }),
  deleteMnetRemoteService2rpc: publicProcedure
    .input(mnetRemoteService2rpcIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetRemoteService2rpc(input.id);
    }),
});
