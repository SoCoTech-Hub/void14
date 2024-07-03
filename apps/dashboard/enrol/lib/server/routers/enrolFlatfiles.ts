import { getEnrolFlatfileById, getEnrolFlatfiles } from "@/lib/api/enrolFlatfiles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolFlatfileIdSchema,
  insertEnrolFlatfileParams,
  updateEnrolFlatfileParams,
} from "@/lib/db/schema/enrolFlatfiles";
import { createEnrolFlatfile, deleteEnrolFlatfile, updateEnrolFlatfile } from "@/lib/api/enrolFlatfiles/mutations";

export const enrolFlatfilesRouter = router({
  getEnrolFlatfiles: publicProcedure.query(async () => {
    return getEnrolFlatfiles();
  }),
  getEnrolFlatfileById: publicProcedure.input(enrolFlatfileIdSchema).query(async ({ input }) => {
    return getEnrolFlatfileById(input.id);
  }),
  createEnrolFlatfile: publicProcedure
    .input(insertEnrolFlatfileParams)
    .mutation(async ({ input }) => {
      return createEnrolFlatfile(input);
    }),
  updateEnrolFlatfile: publicProcedure
    .input(updateEnrolFlatfileParams)
    .mutation(async ({ input }) => {
      return updateEnrolFlatfile(input.id, input);
    }),
  deleteEnrolFlatfile: publicProcedure
    .input(enrolFlatfileIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolFlatfile(input.id);
    }),
});
