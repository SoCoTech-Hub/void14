import { getTaskAdhocById, getTaskAdhocs } from "../api/taskAdhocs/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  taskAdhocIdSchema,
  insertTaskAdhocParams,
  updateTaskAdhocParams,
} from "@soco/task-db/schema/taskAdhocs";
import { createTaskAdhoc, deleteTaskAdhoc, updateTaskAdhoc } from "../api/taskAdhocs/mutations";

export const taskAdhocsRouter =createTRPCRouter({
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
