import {
  createEnrolFlatfile,
  deleteEnrolFlatfile,
  updateEnrolFlatfile,
} from "../api/enrolFlatfiles/mutations";
import {
  getEnrolFlatfileById,
  getEnrolFlatfiles,
} from "../api/enrolFlatfiles/queries";
import {
  enrolFlatfileIdSchema,
  insertEnrolFlatfileParams,
  updateEnrolFlatfileParams,
} from "../db/schema/enrolFlatfiles";
import { publicProcedure, router } from "../server/trpc";

export const enrolFlatfilesRouter = router({
  getEnrolFlatfiles: publicProcedure.query(async () => {
    return getEnrolFlatfiles();
  }),
  getEnrolFlatfileById: publicProcedure
    .input(enrolFlatfileIdSchema)
    .query(async ({ input }) => {
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
