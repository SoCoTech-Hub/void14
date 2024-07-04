import {
  createMnetSsoAccessControl,
  deleteMnetSsoAccessControl,
  updateMnetSsoAccessControl,
} from "../api/mnetSsoAccessControls/mutations";
import {
  getMnetSsoAccessControlById,
  getMnetSsoAccessControls,
} from "../api/mnetSsoAccessControls/queries";
import {
  insertMnetSsoAccessControlParams,
  mnetSsoAccessControlIdSchema,
  updateMnetSsoAccessControlParams,
} from "../db/schema/mnetSsoAccessControls";
import { publicProcedure, router } from "../server/trpc";

export const mnetSsoAccessControlsRouter = router({
  getMnetSsoAccessControls: publicProcedure.query(async () => {
    return getMnetSsoAccessControls();
  }),
  getMnetSsoAccessControlById: publicProcedure
    .input(mnetSsoAccessControlIdSchema)
    .query(async ({ input }) => {
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