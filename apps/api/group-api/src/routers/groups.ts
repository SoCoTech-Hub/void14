import { getGroupById, getGroups } from "../api/groups/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  groupIdSchema,
  insertGroupParams,
  updateGroupParams,
} from "@soco/group-db/schema/groups";
import { createGroup, deleteGroup, updateGroup } from "../api/groups/mutations";

export const groupsRouter =createTRPCRouter({
  getGroups: publicProcedure.query(async () => {
    return getGroups();
  }),
  getGroupById: publicProcedure.input(groupIdSchema).query(async ({ input }) => {
    return getGroupById(input.id);
  }),
  createGroup: publicProcedure
    .input(insertGroupParams)
    .mutation(async ({ input }) => {
      return createGroup(input);
    }),
  updateGroup: publicProcedure
    .input(updateGroupParams)
    .mutation(async ({ input }) => {
      return updateGroup(input.id, input);
    }),
  deleteGroup: publicProcedure
    .input(groupIdSchema)
    .mutation(async ({ input }) => {
      return deleteGroup(input.id);
    }),
});
