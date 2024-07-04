import {
  createTaskAdhoc,
  deleteTaskAdhoc,
  updateTaskAdhoc,
} from "../api/taskAdhocs/mutations";
import { getTaskAdhocById, getTaskAdhocs } from "../api/taskAdhocs/queries";
import {
  insertTaskAdhocParams,
  taskAdhocIdSchema,
  updateTaskAdhocParams,
} from "../db/schema/taskAdhocs";
import { publicProcedure, router } from "../server/trpc";

export const taskAdhocsRouter = router({
  getTaskAdhocs: publicProcedure.query(async () => {
    return getTaskAdhocs();
  }),
  getTaskAdhocById: publicProcedure
    .input(taskAdhocIdSchema)
    .query(async ({ input }) => {
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
