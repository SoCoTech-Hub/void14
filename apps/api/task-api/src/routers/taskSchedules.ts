import {
  insertTaskScheduleParams,
  taskScheduleIdSchema,
  updateTaskScheduleParams,
} from "@soco/task-db/schema/taskSchedules";

import {
  createTaskSchedule,
  deleteTaskSchedule,
  updateTaskSchedule,
} from "../api/taskSchedules/mutations";
import {
  getTaskScheduleById,
  getTaskSchedules,
} from "../api/taskSchedules/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const taskSchedulesRouter = createTRPCRouter({
  getTaskSchedules: publicProcedure.query(async () => {
    return getTaskSchedules();
  }),
  getTaskScheduleById: publicProcedure
    .input(taskScheduleIdSchema)
    .query(async ({ input }) => {
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
