import { getBigBlueButtonBnRecordingById, getBigBlueButtonBnRecordings } from "@/lib/api/bigBlueButtonBnRecordings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  bigBlueButtonBnRecordingIdSchema,
  insertBigBlueButtonBnRecordingParams,
  updateBigBlueButtonBnRecordingParams,
} from "@/lib/db/schema/bigBlueButtonBnRecordings";
import { createBigBlueButtonBnRecording, deleteBigBlueButtonBnRecording, updateBigBlueButtonBnRecording } from "@/lib/api/bigBlueButtonBnRecordings/mutations";

export const bigBlueButtonBnRecordingsRouter = router({
  getBigBlueButtonBnRecordings: publicProcedure.query(async () => {
    return getBigBlueButtonBnRecordings();
  }),
  getBigBlueButtonBnRecordingById: publicProcedure.input(bigBlueButtonBnRecordingIdSchema).query(async ({ input }) => {
    return getBigBlueButtonBnRecordingById(input.id);
  }),
  createBigBlueButtonBnRecording: publicProcedure
    .input(insertBigBlueButtonBnRecordingParams)
    .mutation(async ({ input }) => {
      return createBigBlueButtonBnRecording(input);
    }),
  updateBigBlueButtonBnRecording: publicProcedure
    .input(updateBigBlueButtonBnRecordingParams)
    .mutation(async ({ input }) => {
      return updateBigBlueButtonBnRecording(input.id, input);
    }),
  deleteBigBlueButtonBnRecording: publicProcedure
    .input(bigBlueButtonBnRecordingIdSchema)
    .mutation(async ({ input }) => {
      return deleteBigBlueButtonBnRecording(input.id);
    }),
});
