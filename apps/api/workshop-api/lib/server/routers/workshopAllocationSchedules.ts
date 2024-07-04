import {
  createWorkshopAllocationSchedule,
  deleteWorkshopAllocationSchedule,
  updateWorkshopAllocationSchedule,
} from "../api/workshopAllocationSchedules/mutations";
import {
  getWorkshopAllocationScheduleById,
  getWorkshopAllocationSchedules,
} from "../api/workshopAllocationSchedules/queries";
import {
  insertWorkshopAllocationScheduleParams,
  updateWorkshopAllocationScheduleParams,
  workshopAllocationScheduleIdSchema,
} from "../db/schema/workshopAllocationSchedules";
import { publicProcedure, router } from "../server/trpc";

export const workshopAllocationSchedulesRouter = router({
  getWorkshopAllocationSchedules: publicProcedure.query(async () => {
    return getWorkshopAllocationSchedules();
  }),
  getWorkshopAllocationScheduleById: publicProcedure
    .input(workshopAllocationScheduleIdSchema)
    .query(async ({ input }) => {
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
