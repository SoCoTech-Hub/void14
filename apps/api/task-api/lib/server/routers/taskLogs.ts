import {
  createTaskLog,
  deleteTaskLog,
  updateTaskLog,
} from "../api/taskLogs/mutations";
import { getTaskLogById, getTaskLogs } from "../api/taskLogs/queries";
import {
  insertTaskLogParams,
  taskLogIdSchema,
  updateTaskLogParams,
} from "../db/schema/taskLogs";
import { publicProcedure, router } from "../server/trpc";

export const taskLogsRouter = router({
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
