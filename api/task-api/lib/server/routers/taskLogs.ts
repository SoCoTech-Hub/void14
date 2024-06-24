import { getTaskLogById, getTaskLogs } from "@/lib/api/taskLogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  taskLogIdSchema,
  insertTaskLogParams,
  updateTaskLogParams,
} from "@/lib/db/schema/taskLogs";
import { createTaskLog, deleteTaskLog, updateTaskLog } from "@/lib/api/taskLogs/mutations";

export const taskLogsRouter = router({
  getTaskLogs: publicProcedure.query(async () => {
    return getTaskLogs();
  }),
  getTaskLogById: publicProcedure.input(taskLogIdSchema).query(async ({ input }) => {
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
