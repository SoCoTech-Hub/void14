import {
  imscpIdSchema,
  insertImscpParams,
  updateImscpParams,
} from "@soco/imscp-db/schema/imscps";

import { createImscp, deleteImscp, updateImscp } from "../api/imscps/mutations";
import { getImscpById, getImscps } from "../api/imscps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const imscpsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
