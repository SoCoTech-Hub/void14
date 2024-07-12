import {
  addressIdSchema,
  insertAddressParams,
  updateAddressParams,
} from "@soco/profile-db/schema/addresses";

import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../api/addresses/mutations";
import { getAddressById, getAddresses } from "../api/addresses/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const addressesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getAddresses: publicProcedure.query(async () => {
      return getAddresses();
    }),
    getAddressById: publicProcedure
      .input(addressIdSchema)
      .query(async ({ input }) => {
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
