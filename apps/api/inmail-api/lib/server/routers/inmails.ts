import { getInmailById, getInmails } from "@/lib/api/inmails/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  inmailIdSchema,
  insertInmailParams,
  updateInmailParams,
} from "@/lib/db/schema/inmails";
import { createInmail, deleteInmail, updateInmail } from "@/lib/api/inmails/mutations";

export const inmailsRouter = router({
  getInmails: publicProcedure.query(async () => {
    return getInmails();
  }),
  getInmailById: publicProcedure.input(inmailIdSchema).query(async ({ input }) => {
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
