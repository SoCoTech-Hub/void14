import { getMnetSsoAccessControlById, getMnetSsoAccessControls } from "@/lib/api/mnetSsoAccessControls/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetSsoAccessControlIdSchema,
  insertMnetSsoAccessControlParams,
  updateMnetSsoAccessControlParams,
} from "@/lib/db/schema/mnetSsoAccessControls";
import { createMnetSsoAccessControl, deleteMnetSsoAccessControl, updateMnetSsoAccessControl } from "@/lib/api/mnetSsoAccessControls/mutations";

export const mnetSsoAccessControlsRouter = router({
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
