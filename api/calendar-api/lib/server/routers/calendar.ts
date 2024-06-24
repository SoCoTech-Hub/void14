import { getCalendarById, getCalendar } from "@/lib/api/calendar/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  calendarIdSchema,
  insertCalendarParams,
  updateCalendarParams,
} from "@/lib/db/schema/calendar";
import { createCalendar, deleteCalendar, updateCalendar } from "@/lib/api/calendar/mutations";

export const calendarRouter = router({
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
