import { getImscpById, getImscps } from "@/lib/api/imscps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  imscpIdSchema,
  insertImscpParams,
  updateImscpParams,
} from "@/lib/db/schema/imscps";
import { createImscp, deleteImscp, updateImscp } from "@/lib/api/imscps/mutations";

export const imscpsRouter = router({
  getImscps: publicProcedure.query(async () => {
    return getImscps();
  }),
  getImscpById: publicProcedure.input(imscpIdSchema).query(async ({ input }) => {
    return getImscpById(input.id);
  }),
  createImscp: publicProcedure
    .input(insertImscpParams)
    .mutation(async ({ input }) => {
      return createImscp(input);
    }),
  updateImscp: publicProcedure
    .input(updateImscpParams)
    .mutation(async ({ input }) => {
      return updateImscp(input.id, input);
    }),
  deleteImscp: publicProcedure
    .input(imscpIdSchema)
    .mutation(async ({ input }) => {
      return deleteImscp(input.id);
    }),
});
