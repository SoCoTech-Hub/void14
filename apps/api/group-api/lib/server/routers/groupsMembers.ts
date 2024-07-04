import {
  createGroupsMember,
  deleteGroupsMember,
  updateGroupsMember,
} from "../api/groupsMembers/mutations";
import {
  getGroupsMemberById,
  getGroupsMembers,
} from "../api/groupsMembers/queries";
import {
  groupsMemberIdSchema,
  insertGroupsMemberParams,
  updateGroupsMemberParams,
} from "../db/schema/groupsMembers";
import { publicProcedure, router } from "../server/trpc";

export const groupsMembersRouter = router({
  getGroupsMembers: publicProcedure.query(async () => {
    return getGroupsMembers();
  }),
  getGroupsMemberById: publicProcedure
    .input(groupsMemberIdSchema)
    .query(async ({ input }) => {
      return getGroupsMemberById(input.id);
    }),
  createGroupsMember: publicProcedure
    .input(insertGroupsMemberParams)
    .mutation(async ({ input }) => {
      return createGroupsMember(input);
    }),
  updateGroupsMember: publicProcedure
    .input(updateGroupsMemberParams)
    .mutation(async ({ input }) => {
      return updateGroupsMember(input.id, input);
    }),
  deleteGroupsMember: publicProcedure
    .input(groupsMemberIdSchema)
    .mutation(async ({ input }) => {
      return deleteGroupsMember(input.id);
    }),
});
