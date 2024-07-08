import { getMnetSsoAccessControlById, getMnetSsoAccessControls } from "../api/mnetSsoAccessControls/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  mnetSsoAccessControlIdSchema,
  insertMnetSsoAccessControlParams,
  updateMnetSsoAccessControlParams,
} from "@soco/mnet-db/schema/mnetSsoAccessControls";
import { createMnetSsoAccessControl, deleteMnetSsoAccessControl, updateMnetSsoAccessControl } from "../api/mnetSsoAccessControls/mutations";

export const mnetSsoAccessControlsRouter =createTRPCRouter({
  getMnetSsoAccessControls: publicProcedure.query(async () => {
    return getMnetSsoAccessControls();
  }),
  getMnetSsoAccessControlById: publicProcedure.input(mnetSsoAccessControlIdSchema).query(async ({ input }) => {
    return getMnetSsoAccessControlById(input.id);
  }),
  createMnetSsoAccessControl: publicProcedure
    .input(insertMnetSsoAccessControlParams)
    .mutation(async ({ input }) => {
      return createMnetSsoAccessControl(input);
    }),
  updateMnetSsoAccessControl: publicProcedure
    .input(updateMnetSsoAccessControlParams)
    .mutation(async ({ input }) => {
      return updateMnetSsoAccessControl(input.id, input);
    }),
  deleteMnetSsoAccessControl: publicProcedure
    .input(mnetSsoAccessControlIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetSsoAccessControl(input.id);
    }),
});
