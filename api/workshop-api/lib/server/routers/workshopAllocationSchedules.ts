import { getWorkshopAllocationScheduleById, getWorkshopAllocationSchedules } from "@/lib/api/workshopAllocationSchedules/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopAllocationScheduleIdSchema,
  insertWorkshopAllocationScheduleParams,
  updateWorkshopAllocationScheduleParams,
} from "@/lib/db/schema/workshopAllocationSchedules";
import { createWorkshopAllocationSchedule, deleteWorkshopAllocationSchedule, updateWorkshopAllocationSchedule } from "@/lib/api/workshopAllocationSchedules/mutations";

export const workshopAllocationSchedulesRouter = router({
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
