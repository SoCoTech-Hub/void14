import {
  createMnetHost,
  deleteMnetHost,
  updateMnetHost,
} from "../api/mnetHosts/mutations";
import { getMnetHostById, getMnetHosts } from "../api/mnetHosts/queries";
import {
  insertMnetHostParams,
  mnetHostIdSchema,
  updateMnetHostParams,
} from "../db/schema/mnetHosts";
import { publicProcedure, router } from "../server/trpc";

export const mnetHostsRouter = router({
  getMnetHosts: publicProcedure.query(async () => {
    return getMnetHosts();
  }),
  getMnetHostById: publicProcedure
    .input(mnetHostIdSchema)
    .query(async ({ input }) => {
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
