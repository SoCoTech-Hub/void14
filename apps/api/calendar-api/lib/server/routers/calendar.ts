import {
  createCalendar,
  deleteCalendar,
  updateCalendar,
} from "../api/calendar/mutations";
import { getCalendar, getCalendarById } from "../api/calendar/queries";
import {
  calendarIdSchema,
  insertCalendarParams,
  updateCalendarParams,
} from "../db/schema/calendar";
import { publicProcedure, router } from "../server/trpc";

export const calendarRouter = router({
  getCalendar: publicProcedure.query(async () => {
    return getCalendar();
  }),
  getCalendarById: publicProcedure
    .input(calendarIdSchema)
    .query(async ({ input }) => {
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
