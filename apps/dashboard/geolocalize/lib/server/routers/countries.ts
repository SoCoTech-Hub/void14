import { getCountryById, getCountries } from "@/lib/api/countries/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  countryIdSchema,
  insertCountryParams,
  updateCountryParams,
} from "@/lib/db/schema/countries";
import { createCountry, deleteCountry, updateCountry } from "@/lib/api/countries/mutations";

export const countriesRouter = router({
  getCountries: publicProcedure.query(async () => {
    return getCountries();
  }),
  getCountryById: publicProcedure.input(countryIdSchema).query(async ({ input }) => {
    return getCountryById(input.id);
  }),
  createCountry: publicProcedure
    .input(insertCountryParams)
    .mutation(async ({ input }) => {
      return createCountry(input);
    }),
  updateCountry: publicProcedure
    .input(updateCountryParams)
    .mutation(async ({ input }) => {
      return updateCountry(input.id, input);
    }),
  deleteCountry: publicProcedure
    .input(countryIdSchema)
    .mutation(async ({ input }) => {
      return deleteCountry(input.id);
    }),
});
