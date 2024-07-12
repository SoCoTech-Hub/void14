import {
  insertRoleContextLevelParams,
  roleContextLevelIdSchema,
  updateRoleContextLevelParams,
} from "@soco/role-db/schema/roleContextLevels";

import {
  createRoleContextLevel,
  deleteRoleContextLevel,
  updateRoleContextLevel,
} from "../api/roleContextLevels/mutations";
import {
  getRoleContextLevelById,
  getRoleContextLevels,
} from "../api/roleContextLevels/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const roleContextLevelsRouter = createTRPCRouter({
  getRoleContextLevels: publicProcedure.query(async () => {
    return getRoleContextLevels();
  }),
  getRoleContextLevelById: publicProcedure
    .input(roleContextLevelIdSchema)
    .query(async ({ input }) => {
      return getRoleContextLevelById(input.id);
    }),
  createRoleContextLevel: publicProcedure
    .input(insertRoleContextLevelParams)
    .mutation(async ({ input }) => {
      return createRoleContextLevel(input);
    }),
  updateRoleContextLevel: publicProcedure
    .input(updateRoleContextLevelParams)
    .mutation(async ({ input }) => {
      return updateRoleContextLevel(input.id, input);
    }),
  deleteRoleContextLevel: publicProcedure
    .input(roleContextLevelIdSchema)
    .mutation(async ({ input }) => {
      return deleteRoleContextLevel(input.id);
    }),
});
