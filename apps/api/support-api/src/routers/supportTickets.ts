import {
  insertSupportTicketParams,
  supportTicketIdSchema,
  updateSupportTicketParams,
} from "@soco/support-db/schema/supportTickets";

import {
  createSupportTicket,
  deleteSupportTicket,
  updateSupportTicket,
} from "../api/supportTickets/mutations";
import {
  getSupportTicketById,
  getSupportTickets,
} from "../api/supportTickets/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const supportTicketsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSupportTickets: publicProcedure.query(async () => {
      return getSupportTickets();
    }),
    getSupportTicketById: publicProcedure
      .input(supportTicketIdSchema)
      .query(async ({ input }) => {
        return getSupportTicketById(input.id);
      }),
    createSupportTicket: publicProcedure
      .input(insertSupportTicketParams)
      .mutation(async ({ input }) => {
        return createSupportTicket(input);
      }),
    updateSupportTicket: publicProcedure
      .input(updateSupportTicketParams)
      .mutation(async ({ input }) => {
        return updateSupportTicket(input.id, input);
      }),
    deleteSupportTicket: publicProcedure
      .input(supportTicketIdSchema)
      .mutation(async ({ input }) => {
        return deleteSupportTicket(input.id);
      }),
  });
