import { getMnetService2rpcById, getMnetService2rpcs } from "@/lib/api/mnetService2rpcs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetService2rpcIdSchema,
  insertMnetService2rpcParams,
  updateMnetService2rpcParams,
} from "@/lib/db/schema/mnetService2rpcs";
import { createMnetService2rpc, deleteMnetService2rpc, updateMnetService2rpc } from "@/lib/api/mnetService2rpcs/mutations";

export const mnetService2rpcsRouter = router({
  getMnetService2rpcs: publicProcedure.query(async () => {
    return getMnetService2rpcs();
  }),
  getMnetService2rpcById: publicProcedure.input(mnetService2rpcIdSchema).query(async ({ input }) => {
    return getMnetService2rpcById(input.id);
  }),
  createMnetService2rpc: publicProcedure
    .input(insertMnetService2rpcParams)
    .mutation(async ({ input }) => {
      return createMnetService2rpc(input);
    }),
  updateMnetService2rpc: publicProcedure
    .input(updateMnetService2rpcParams)
    .mutation(async ({ input }) => {
      return updateMnetService2rpc(input.id, input);
    }),
  deleteMnetService2rpc: publicProcedure
    .input(mnetService2rpcIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetService2rpc(input.id);
    }),
});
