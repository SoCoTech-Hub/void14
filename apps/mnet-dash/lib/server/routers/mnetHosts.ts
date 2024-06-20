import { getMnetHostById, getMnetHosts } from "@/lib/api/mnetHosts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetHostIdSchema,
  insertMnetHostParams,
  updateMnetHostParams,
} from "@/lib/db/schema/mnetHosts";
import { createMnetHost, deleteMnetHost, updateMnetHost } from "@/lib/api/mnetHosts/mutations";

export const mnetHostsRouter = router({
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
