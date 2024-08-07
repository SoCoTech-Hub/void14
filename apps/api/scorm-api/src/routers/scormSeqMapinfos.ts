import {
  insertScormSeqMapinfoParams,
  scormSeqMapinfoIdSchema,
  updateScormSeqMapinfoParams,
} from "@soco/scorm-db/schema/scormSeqMapinfos";

import {
  createScormSeqMapinfo,
  deleteScormSeqMapinfo,
  updateScormSeqMapinfo,
} from "../api/scormSeqMapinfos/mutations";
import {
  getScormSeqMapinfoById,
  getScormSeqMapinfos,
} from "../api/scormSeqMapinfos/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scormSeqMapinfosRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getScormSeqMapinfos: publicProcedure.query(async () => {
      return getScormSeqMapinfos();
    }),
    getScormSeqMapinfoById: publicProcedure
      .input(scormSeqMapinfoIdSchema)
      .query(async ({ input }) => {
        return getScormSeqMapinfoById(input.id);
      }),
    createScormSeqMapinfo: publicProcedure
      .input(insertScormSeqMapinfoParams)
      .mutation(async ({ input }) => {
        return createScormSeqMapinfo(input);
      }),
    updateScormSeqMapinfo: publicProcedure
      .input(updateScormSeqMapinfoParams)
      .mutation(async ({ input }) => {
        return updateScormSeqMapinfo(input.id, input);
      }),
    deleteScormSeqMapinfo: publicProcedure
      .input(scormSeqMapinfoIdSchema)
      .mutation(async ({ input }) => {
        return deleteScormSeqMapinfo(input.id);
      }),
  });
