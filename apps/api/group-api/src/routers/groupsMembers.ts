import {
  groupsMemberIdSchema,
  insertGroupsMemberParams,
  updateGroupsMemberParams,
} from "@soco/group-db/schema/groupsMembers";

import {
  createGroupsMember,
  deleteGroupsMember,
  updateGroupsMember,
} from "../api/groupsMembers/mutations";
import {
  getGroupsMemberById,
  getGroupsMembers,
} from "../api/groupsMembers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const groupsMembersRouter = createTRPCRouter({
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
