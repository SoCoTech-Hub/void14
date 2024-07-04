import { createImscp, deleteImscp, updateImscp } from "../api/imscps/mutations";
import { getImscpById, getImscps } from "../api/imscps/queries";
import {
  imscpIdSchema,
  insertImscpParams,
  updateImscpParams,
} from "../db/schema/imscps";
import { publicProcedure, router } from "../server/trpc";

export const imscpsRouter = router({
  getImscps: publicProcedure.query(async () => {
    return getImscps();
  }),
  getImscpById: publicProcedure
    .input(imscpIdSchema)
    .query(async ({ input }) => {
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
