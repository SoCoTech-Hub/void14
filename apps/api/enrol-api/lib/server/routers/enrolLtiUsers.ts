import {
  createEnrolLtiUser,
  deleteEnrolLtiUser,
  updateEnrolLtiUser,
} from "../api/enrolLtiUsers/mutations";
import {
  getEnrolLtiUserById,
  getEnrolLtiUsers,
} from "../api/enrolLtiUsers/queries";
import {
  enrolLtiUserIdSchema,
  insertEnrolLtiUserParams,
  updateEnrolLtiUserParams,
} from "../db/schema/enrolLtiUsers";
import { publicProcedure, router } from "../server/trpc";

export const enrolLtiUsersRouter = router({
  getEnrolLtiUsers: publicProcedure.query(async () => {
    return getEnrolLtiUsers();
  }),
  getEnrolLtiUserById: publicProcedure
    .input(enrolLtiUserIdSchema)
    .query(async ({ input }) => {
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
