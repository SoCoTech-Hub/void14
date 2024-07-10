import { db } from "@soco/geolocalize-db/client";
import { eq } from "@soco/geolocalize-db";
import { type CountryId, countryIdSchema, countries } from "@soco/geolocalize-db/schema/countries";

export const getCountries = async () => {
  const rows = await db.select().from(countries);
  const c = rows
  return { countries: c };
};

export const getCountryById = async (id: CountryId) => {
  const { id: countryId } = countryIdSchema.parse({ id });
  const [row] = await db.select().from(countries).where(eq(countries.id, countryId));
  if (row === undefined) return {};
  const c = row;
  return { country: c };
};


