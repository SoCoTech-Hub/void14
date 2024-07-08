import { getMnetRpcById, getMnetRpcs } from "../api/mnetRpcs/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  mnetRpcIdSchema,
  insertMnetRpcParams,
  updateMnetRpcParams,
} from "@soco/mnet-db/schema/mnetRpcs";
import { createMnetRpc, deleteMnetRpc, updateMnetRpc } from "../api/mnetRpcs/mutations";

export const mnetRpcsRouter =createTRPCRouter({
  getMnetRpcs: publicProcedure.query(async () => {
    return getMnetRpcs();
  }),
  getMnetRpcById: publicProcedure.input(mnetRpcIdSchema).query(async ({ input }) => {
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
