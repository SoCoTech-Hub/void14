import { getBigBlueButtonBnRecordingById, getBigBlueButtonBnRecordings } from "../api/bigBlueButtonBnRecordings/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  bigBlueButtonBnRecordingIdSchema,
  insertBigBlueButtonBnRecordingParams,
  updateBigBlueButtonBnRecordingParams,
} from "@soco/big-blue-button-db/schema/bigBlueButtonBnRecordings";
import { createBigBlueButtonBnRecording, deleteBigBlueButtonBnRecording, updateBigBlueButtonBnRecording } from "../api/bigBlueButtonBnRecordings/mutations";

export const bigBlueButtonBnRecordingsRouter =createTRPCRouter({
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
