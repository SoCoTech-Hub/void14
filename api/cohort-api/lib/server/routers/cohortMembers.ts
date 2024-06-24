import { getCohortMemberById, getCohortMembers } from "@/lib/api/cohortMembers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  cohortMemberIdSchema,
  insertCohortMemberParams,
  updateCohortMemberParams,
} from "@/lib/db/schema/cohortMembers";
import { createCohortMember, deleteCohortMember, updateCohortMember } from "@/lib/api/cohortMembers/mutations";

export const cohortMembersRouter = router({
  getCohortMembers: publicProcedure.query(async () => {
    return getCohortMembers();
  }),
  getCohortMemberById: publicProcedure.input(cohortMemberIdSchema).query(async ({ input }) => {
    return getCohortMemberById(input.id);
  }),
  createCohortMember: publicProcedure
    .input(insertCohortMemberParams)
    .mutation(async ({ input }) => {
      return createCohortMember(input);
    }),
  updateCohortMember: publicProcedure
    .input(updateCohortMemberParams)
    .mutation(async ({ input }) => {
      return updateCohortMember(input.id, input);
    }),
  deleteCohortMember: publicProcedure
    .input(cohortMemberIdSchema)
    .mutation(async ({ input }) => {
      return deleteCohortMember(input.id);
    }),
});
