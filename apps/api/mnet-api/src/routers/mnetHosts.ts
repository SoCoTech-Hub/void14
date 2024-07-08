import { getMnetHostById, getMnetHosts } from "../api/mnetHosts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  mnetHostIdSchema,
  insertMnetHostParams,
  updateMnetHostParams,
} from "@soco/mnet-db/schema/mnetHosts";
import { createMnetHost, deleteMnetHost, updateMnetHost } from "../api/mnetHosts/mutations";

export const mnetHostsRouter =createTRPCRouter({
  getMnetHosts: publicProcedure.query(async () => {
    return getMnetHosts();
  }),
  getMnetHostById: publicProcedure.input(mnetHostIdSchema).query(async ({ input }) => {
    return getMnetHostById(input.id);
  }),
  createMnetHost: publicProcedure
    .input(insertMnetHostParams)
    .mutation(async ({ input }) => {
      return createMnetHost(input);
    }),
  updateMnetHost: publicProcedure
    .input(updateMnetHostParams)
    .mutation(async ({ input }) => {
      return updateMnetHost(input.id, input);
    }),
  deleteMnetHost: publicProcedure
    .input(mnetHostIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetHost(input.id);
    }),
});
