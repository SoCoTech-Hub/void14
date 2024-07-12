import {
  calendarIdSchema,
  insertCalendarParams,
  updateCalendarParams,
} from "@soco/calendar-db/schema/calendar";

import {
  createCalendar,
  deleteCalendar,
  updateCalendar,
} from "../api/calendar/mutations";
import { getCalendarById, getCalendars } from "../api/calendar/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const calendarRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getCalendar: publicProcedure.query(async () => {
      return getCalendars();
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
