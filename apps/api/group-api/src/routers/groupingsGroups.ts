import { getGroupingsGroupById, getGroupingsGroups } from "../api/groupingsGroups/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  groupingsGroupIdSchema,
  insertGroupingsGroupParams,
  updateGroupingsGroupParams,
} from "@soco/group-db/schema/groupingsGroups";
import { createGroupingsGroup, deleteGroupingsGroup, updateGroupingsGroup } from "../api/groupingsGroups/mutations";

export const groupingsGroupsRouter =createTRPCRouter({
  getGroupingsGroups: publicProcedure.query(async () => {
    return getGroupingsGroups();
  }),
  getGroupingsGroupById: publicProcedure.input(groupingsGroupIdSchema).query(async ({ input }) => {
    return getGroupingsGroupById(input.id);
  }),
  createGroupingsGroup: publicProcedure
    .input(insertGroupingsGroupParams)
    .mutation(async ({ input }) => {
      return createGroupingsGroup(input);
    }),
  updateGroupingsGroup: publicProcedure
    .input(updateGroupingsGroupParams)
    .mutation(async ({ input }) => {
      return updateGroupingsGroup(input.id, input);
    }),
  deleteGroupingsGroup: publicProcedure
    .input(groupingsGroupIdSchema)
    .mutation(async ({ input }) => {
      return deleteGroupingsGroup(input.id);
    }),
});
