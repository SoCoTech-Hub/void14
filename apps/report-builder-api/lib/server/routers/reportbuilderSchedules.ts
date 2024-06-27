import { getReportbuilderScheduleById, getReportbuilderSchedules } from "@/lib/api/reportbuilderSchedules/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  reportbuilderScheduleIdSchema,
  insertReportbuilderScheduleParams,
  updateReportbuilderScheduleParams,
} from "@/lib/db/schema/reportbuilderSchedules";
import { createReportbuilderSchedule, deleteReportbuilderSchedule, updateReportbuilderSchedule } from "@/lib/api/reportbuilderSchedules/mutations";

export const reportbuilderSchedulesRouter = router({
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
