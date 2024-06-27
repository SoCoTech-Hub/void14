import { getEnrolById, getEnrols } from "@/lib/api/enrols/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolIdSchema,
  insertEnrolParams,
  updateEnrolParams,
} from "@/lib/db/schema/enrols";
import { createEnrol, deleteEnrol, updateEnrol } from "@/lib/api/enrols/mutations";

export const enrolsRouter = router({
  getEnrols: publicProcedure.query(async () => {
    return getEnrols();
  }),
  getEnrolById: publicProcedure.input(enrolIdSchema).query(async ({ input }) => {
    return getEnrolById(input.id);
  }),
  createEnrol: publicProcedure
    .input(insertEnrolParams)
    .mutation(async ({ input }) => {
      return createEnrol(input);
    }),
  updateEnrol: publicProcedure
    .input(updateEnrolParams)
    .mutation(async ({ input }) => {
      return updateEnrol(input.id, input);
    }),
  deleteEnrol: publicProcedure
    .input(enrolIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrol(input.id);
    }),
});
