import { getDataRecordById, getDataRecords } from "../api/dataRecords/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  dataRecordIdSchema,
  insertDataRecordParams,
  updateDataRecordParams,
} from "@soco/data-db/schema/dataRecords";
import { createDataRecord, deleteDataRecord, updateDataRecord } from "../api/dataRecords/mutations";

export const dataRecordsRouter =createTRPCRouter({
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