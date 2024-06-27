import { getTaskScheduleById, getTaskSchedules } from "@/lib/api/taskSchedules/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  taskScheduleIdSchema,
  insertTaskScheduleParams,
  updateTaskScheduleParams,
} from "@/lib/db/schema/taskSchedules";
import { createTaskSchedule, deleteTaskSchedule, updateTaskSchedule } from "@/lib/api/taskSchedules/mutations";

export const taskSchedulesRouter = router({
  getTaskSchedules: publicProcedure.query(async () => {
    return getTaskSchedules();
  }),
  getTaskScheduleById: publicProcedure.input(taskScheduleIdSchema).query(async ({ input }) => {
    return getTaskScheduleById(input.id);
  }),
  createTaskSchedule: publicProcedure
    .input(insertTaskScheduleParams)
    .mutation(async ({ input }) => {
      return createTaskSchedule(input);
    }),
  updateTaskSchedule: publicProcedure
    .input(updateTaskScheduleParams)
    .mutation(async ({ input }) => {
      return updateTaskSchedule(input.id, input);
    }),
  deleteTaskSchedule: publicProcedure
    .input(taskScheduleIdSchema)
    .mutation(async ({ input }) => {
      return deleteTaskSchedule(input.id);
    }),
});
