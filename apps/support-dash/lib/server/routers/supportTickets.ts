import { getSupportTicketById, getSupportTickets } from "@/lib/api/supportTickets/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  supportTicketIdSchema,
  insertSupportTicketParams,
  updateSupportTicketParams,
} from "@/lib/db/schema/supportTickets";
import { createSupportTicket, deleteSupportTicket, updateSupportTicket } from "@/lib/api/supportTickets/mutations";

export const supportTicketsRouter = router({
  getSupportTickets: publicProcedure.query(async () => {
    return getSupportTickets();
  }),
  getSupportTicketById: publicProcedure.input(supportTicketIdSchema).query(async ({ input }) => {
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
