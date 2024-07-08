import { getWorkshopAllocationScheduleById, getWorkshopAllocationSchedules } from "../api/workshopAllocationSchedules/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopAllocationScheduleIdSchema,
  insertWorkshopAllocationScheduleParams,
  updateWorkshopAllocationScheduleParams,
} from "@soco/workshop-db/schema/workshopAllocationSchedules";
import { createWorkshopAllocationSchedule, deleteWorkshopAllocationSchedule, updateWorkshopAllocationSchedule } from "../api/workshopAllocationSchedules/mutations";

export const workshopAllocationSchedulesRouter =createTRPCRouter({
  getWorkshopAllocationSchedules: publicProcedure.query(async () => {
    return getWorkshopAllocationSchedules();
  }),
  getWorkshopAllocationScheduleById: publicProcedure.input(workshopAllocationScheduleIdSchema).query(async ({ input }) => {
    return getWorkshopAllocationScheduleById(input.id);
  }),
  createWorkshopAllocationSchedule: publicProcedure
    .input(insertWorkshopAllocationScheduleParams)
    .mutation(async ({ input }) => {
      return createWorkshopAllocationSchedule(input);
    }),
  updateWorkshopAllocationSchedule: publicProcedure
    .input(updateWorkshopAllocationScheduleParams)
    .mutation(async ({ input }) => {
      return updateWorkshopAllocationSchedule(input.id, input);
    }),
  deleteWorkshopAllocationSchedule: publicProcedure
    .input(workshopAllocationScheduleIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopAllocationSchedule(input.id);
    }),
});
