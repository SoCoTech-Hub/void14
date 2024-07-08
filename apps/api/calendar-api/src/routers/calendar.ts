import { getCalendarById, getCalendar } from "../api/calendar/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  calendarIdSchema,
  insertCalendarParams,
  updateCalendarParams,
} from "@soco/calendar-db/schema/calendar";
import { createCalendar, deleteCalendar, updateCalendar } from "../api/calendar/mutations";

export const calendarRouter =createTRPCRouter({
  getCalendar: publicProcedure.query(async () => {
    return getCalendar();
  }),
  getCalendarById: publicProcedure.input(calendarIdSchema).query(async ({ input }) => {
    return getCalendarById(input.id);
  }),
  createCalendar: publicProcedure
    .input(insertCalendarParams)
    .mutation(async ({ input }) => {
      return createCalendar(input);
    }),
  updateCalendar: publicProcedure
    .input(updateCalendarParams)
    .mutation(async ({ input }) => {
      return updateCalendar(input.id, input);
    }),
  deleteCalendar: publicProcedure
    .input(calendarIdSchema)
    .mutation(async ({ input }) => {
      return deleteCalendar(input.id);
    }),
});
