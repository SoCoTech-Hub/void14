import {
  createCountry,
  deleteCountry,
  updateCountry,
} from "../api/countries/mutations";
import { getCountries, getCountryById } from "../api/countries/queries";
import {
  countryIdSchema,
  insertCountryParams,
  updateCountryParams,
} from "../db/schema/countries";
import { publicProcedure, router } from "../server/trpc";

export const countriesRouter = router({
  getCountries: publicProcedure.query(async () => {
    return getCountries();
  }),
  getCountryById: publicProcedure
    .input(countryIdSchema)
    .query(async ({ input }) => {
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
