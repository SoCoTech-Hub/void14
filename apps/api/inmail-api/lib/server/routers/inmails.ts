import {
  createInmail,
  deleteInmail,
  updateInmail,
} from "../api/inmails/mutations";
import { getInmailById, getInmails } from "../api/inmails/queries";
import {
  inmailIdSchema,
  insertInmailParams,
  updateInmailParams,
} from "../db/schema/inmails";
import { publicProcedure, router } from "../server/trpc";

export const inmailsRouter = router({
  getInmails: publicProcedure.query(async () => {
    return getInmails();
  }),
  getInmailById: publicProcedure
    .input(inmailIdSchema)
    .query(async ({ input }) => {
      return getInmailById(input.id);
    }),
  createInmail: publicProcedure
    .input(insertInmailParams)
    .mutation(async ({ input }) => {
      return createInmail(input);
    }),
  updateInmail: publicProcedure
    .input(updateInmailParams)
    .mutation(async ({ input }) => {
      return updateInmail(input.id, input);
    }),
  deleteInmail: publicProcedure
    .input(inmailIdSchema)
    .mutation(async ({ input }) => {
      return deleteInmail(input.id);
    }),
});
