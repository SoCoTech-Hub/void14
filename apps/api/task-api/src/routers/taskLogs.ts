import {
  insertTaskLogParams,
  taskLogIdSchema,
  updateTaskLogParams,
} from "@soco/task-db/schema/taskLogs";

import {
  createTaskLog,
  deleteTaskLog,
  updateTaskLog,
} from "../api/taskLogs/mutations";
import { getTaskLogById, getTaskLogs } from "../api/taskLogs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const taskLogsRouter = createTRPCRouter({
  getTaskLogs: publicProcedure.query(async () => {
    return getTaskLogs();
  }),
  getTaskLogById: publicProcedure
    .input(taskLogIdSchema)
    .query(async ({ input }) => {
      return getTaskLogById(input.id);
    }),
  createTaskLog: publicProcedure
    .input(insertTaskLogParams)
    .mutation(async ({ input }) => {
      return createTaskLog(input);
    }),
  updateTaskLog: publicProcedure
    .input(updateTaskLogParams)
    .mutation(async ({ input }) => {
      return updateTaskLog(input.id, input);
    }),
  deleteTaskLog: publicProcedure
    .input(taskLogIdSchema)
    .mutation(async ({ input }) => {
      return deleteTaskLog(input.id);
    }),
});
