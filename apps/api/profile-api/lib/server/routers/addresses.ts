import { getAddressById, getAddresses } from "@/lib/api/addresses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  addressIdSchema,
  insertAddressParams,
  updateAddressParams,
} from "@/lib/db/schema/addresses";
import { createAddress, deleteAddress, updateAddress } from "@/lib/api/addresses/mutations";

export const addressesRouter = router({
  getAddresses: publicProcedure.query(async () => {
    return getAddresses();
  }),
  getAddressById: publicProcedure.input(addressIdSchema).query(async ({ input }) => {
    return getAddressById(input.id);
  }),
  createAddress: publicProcedure
    .input(insertAddressParams)
    .mutation(async ({ input }) => {
      return createAddress(input);
    }),
  updateAddress: publicProcedure
    .input(updateAddressParams)
    .mutation(async ({ input }) => {
      return updateAddress(input.id, input);
    }),
  deleteAddress: publicProcedure
    .input(addressIdSchema)
    .mutation(async ({ input }) => {
      return deleteAddress(input.id);
    }),
});
