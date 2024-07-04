import {
  createGroupingsGroup,
  deleteGroupingsGroup,
  updateGroupingsGroup,
} from "../api/groupingsGroups/mutations";
import {
  getGroupingsGroupById,
  getGroupingsGroups,
} from "../api/groupingsGroups/queries";
import {
  groupingsGroupIdSchema,
  insertGroupingsGroupParams,
  updateGroupingsGroupParams,
} from "../db/schema/groupingsGroups";
import { publicProcedure, router } from "../server/trpc";

export const groupingsGroupsRouter = router({
  getGroupingsGroups: publicProcedure.query(async () => {
    return getGroupingsGroups();
  }),
  getGroupingsGroupById: publicProcedure
    .input(groupingsGroupIdSchema)
    .query(async ({ input }) => {
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
