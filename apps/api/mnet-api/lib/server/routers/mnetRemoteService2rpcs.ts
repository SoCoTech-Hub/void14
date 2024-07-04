import {
  createMnetRemoteService2rpc,
  deleteMnetRemoteService2rpc,
  updateMnetRemoteService2rpc,
} from "../api/mnetRemoteService2rpcs/mutations";
import {
  getMnetRemoteService2rpcById,
  getMnetRemoteService2rpcs,
} from "../api/mnetRemoteService2rpcs/queries";
import {
  insertMnetRemoteService2rpcParams,
  mnetRemoteService2rpcIdSchema,
  updateMnetRemoteService2rpcParams,
} from "../db/schema/mnetRemoteService2rpcs";
import { publicProcedure, router } from "../server/trpc";

export const mnetRemoteService2rpcsRouter = router({
  getMnetRemoteService2rpcs: publicProcedure.query(async () => {
    return getMnetRemoteService2rpcs();
  }),
  getMnetRemoteService2rpcById: publicProcedure
    .input(mnetRemoteService2rpcIdSchema)
    .query(async ({ input }) => {
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
