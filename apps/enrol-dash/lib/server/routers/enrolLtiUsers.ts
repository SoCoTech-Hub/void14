import { getEnrolLtiUserById, getEnrolLtiUsers } from "@/lib/api/enrolLtiUsers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiUserIdSchema,
  insertEnrolLtiUserParams,
  updateEnrolLtiUserParams,
} from "@/lib/db/schema/enrolLtiUsers";
import { createEnrolLtiUser, deleteEnrolLtiUser, updateEnrolLtiUser } from "@/lib/api/enrolLtiUsers/mutations";

export const enrolLtiUsersRouter = router({
  getEnrolLtiUsers: publicProcedure.query(async () => {
    return getEnrolLtiUsers();
  }),
  getEnrolLtiUserById: publicProcedure.input(enrolLtiUserIdSchema).query(async ({ input }) => {
    return getEnrolLtiUserById(input.id);
  }),
  createEnrolLtiUser: publicProcedure
    .input(insertEnrolLtiUserParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiUser(input);
    }),
  updateEnrolLtiUser: publicProcedure
    .input(updateEnrolLtiUserParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiUser(input.id, input);
    }),
  deleteEnrolLtiUser: publicProcedure
    .input(enrolLtiUserIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiUser(input.id);
    }),
});
