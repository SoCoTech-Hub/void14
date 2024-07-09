import { getReportbuilderScheduleById, getReportbuilderSchedules } from "../api/reportbuilderSchedules/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  reportbuilderScheduleIdSchema,
  insertReportbuilderScheduleParams,
  updateReportbuilderScheduleParams,
} from "@soco/report-builder-db/schema/reportbuilderSchedules";
import { createReportbuilderSchedule, deleteReportbuilderSchedule, updateReportbuilderSchedule } from "../api/reportbuilderSchedules/mutations";

export const reportbuilderSchedulesRouter =createTRPCRouter({
  getReportbuilderSchedules: publicProcedure.query(async () => {
    return getReportbuilderSchedules();
  }),
  getReportbuilderScheduleById: publicProcedure.input(reportbuilderScheduleIdSchema).query(async ({ input }) => {
    return getReportbuilderScheduleById(input.id);
  }),
  createReportbuilderSchedule: publicProcedure
    .input(insertReportbuilderScheduleParams)
    .mutation(async ({ input }) => {
      return createReportbuilderSchedule(input);
    }),
  updateReportbuilderSchedule: publicProcedure
    .input(updateReportbuilderScheduleParams)
    .mutation(async ({ input }) => {
      return updateReportbuilderSchedule(input.id, input);
    }),
  deleteReportbuilderSchedule: publicProcedure
    .input(reportbuilderScheduleIdSchema)
    .mutation(async ({ input }) => {
      return deleteReportbuilderSchedule(input.id);
    }),
});