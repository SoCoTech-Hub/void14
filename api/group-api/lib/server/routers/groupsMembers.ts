import { getGroupsMemberById, getGroupsMembers } from "@/lib/api/groupsMembers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  groupsMemberIdSchema,
  insertGroupsMemberParams,
  updateGroupsMemberParams,
} from "@/lib/db/schema/groupsMembers";
import { createGroupsMember, deleteGroupsMember, updateGroupsMember } from "@/lib/api/groupsMembers/mutations";

export const groupsMembersRouter = router({
  getGroupsMembers: publicProcedure.query(async () => {
    return getGroupsMembers();
  }),
  getGroupsMemberById: publicProcedure.input(groupsMemberIdSchema).query(async ({ input }) => {
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
