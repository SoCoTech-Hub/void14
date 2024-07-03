import { getDataRecordById, getDataRecords } from "@/lib/api/dataRecords/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  dataRecordIdSchema,
  insertDataRecordParams,
  updateDataRecordParams,
} from "@/lib/db/schema/dataRecords";
import { createDataRecord, deleteDataRecord, updateDataRecord } from "@/lib/api/dataRecords/mutations";

export const dataRecordsRouter = router({
  getDataRecords: publicProcedure.query(async () => {
    return getDataRecords();
  }),
  getDataRecordById: publicProcedure.input(dataRecordIdSchema).query(async ({ input }) => {
    return getDataRecordById(input.id);
  }),
  createDataRecord: publicProcedure
    .input(insertDataRecordParams)
    .mutation(async ({ input }) => {
      return createDataRecord(input);
    }),
  updateDataRecord: publicProcedure
    .input(updateDataRecordParams)
    .mutation(async ({ input }) => {
      return updateDataRecord(input.id, input);
    }),
  deleteDataRecord: publicProcedure
    .input(dataRecordIdSchema)
    .mutation(async ({ input }) => {
      return deleteDataRecord(input.id);
    }),
});
