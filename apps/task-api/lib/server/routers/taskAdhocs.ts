import { getTaskAdhocById, getTaskAdhocs } from "@/lib/api/taskAdhocs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  taskAdhocIdSchema,
  insertTaskAdhocParams,
  updateTaskAdhocParams,
} from "@/lib/db/schema/taskAdhocs";
import { createTaskAdhoc, deleteTaskAdhoc, updateTaskAdhoc } from "@/lib/api/taskAdhocs/mutations";

export const taskAdhocsRouter = router({
  getTaskAdhocs: publicProcedure.query(async () => {
    return getTaskAdhocs();
  }),
  getTaskAdhocById: publicProcedure.input(taskAdhocIdSchema).query(async ({ input }) => {
    return getTaskAdhocById(input.id);
  }),
  createTaskAdhoc: publicProcedure
    .input(insertTaskAdhocParams)
    .mutation(async ({ input }) => {
      return createTaskAdhoc(input);
    }),
  updateTaskAdhoc: publicProcedure
    .input(updateTaskAdhocParams)
    .mutation(async ({ input }) => {
      return updateTaskAdhoc(input.id, input);
    }),
  deleteTaskAdhoc: publicProcedure
    .input(taskAdhocIdSchema)
    .mutation(async ({ input }) => {
      return deleteTaskAdhoc(input.id);
    }),
});
