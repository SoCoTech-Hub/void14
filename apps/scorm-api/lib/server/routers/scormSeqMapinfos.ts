import { getScormSeqMapinfoById, getScormSeqMapinfos } from "@/lib/api/scormSeqMapinfos/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scormSeqMapinfoIdSchema,
  insertScormSeqMapinfoParams,
  updateScormSeqMapinfoParams,
} from "@/lib/db/schema/scormSeqMapinfos";
import { createScormSeqMapinfo, deleteScormSeqMapinfo, updateScormSeqMapinfo } from "@/lib/api/scormSeqMapinfos/mutations";

export const scormSeqMapinfosRouter = router({
  getScormSeqMapinfos: publicProcedure.query(async () => {
    return getScormSeqMapinfos();
  }),
  getScormSeqMapinfoById: publicProcedure.input(scormSeqMapinfoIdSchema).query(async ({ input }) => {
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
