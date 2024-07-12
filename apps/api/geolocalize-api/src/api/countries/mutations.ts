import type {
  CountryId,
  NewCountryParams,
  UpdateCountryParams,
} from "@soco/geolocalize-db/schema/countries";
import { eq } from "@soco/geolocalize-db";
import { db } from "@soco/geolocalize-db/client";
import {
  countries,
  countryIdSchema,
  insertCountrySchema,
  updateCountrySchema,
} from "@soco/geolocalize-db/schema/countries";

export const createCountry = async (country: NewCountryParams) => {
  const newCountry = insertCountrySchema.parse(country);
  try {
    const [c] = await db.insert(countries).values(newCountry).returning();
    return { country: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCountry = async (
  id: CountryId,
  country: UpdateCountryParams,
) => {
  const { id: countryId } = countryIdSchema.parse({ id });
  const newCountry = updateCountrySchema.parse(country);
  try {
    const [c] = await db
      .update(countries)
      .set(newCountry)
      .where(eq(countries.id, countryId!))
      .returning();
    return { country: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCountry = async (id: CountryId) => {
  const { id: countryId } = countryIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(countries)
      .where(eq(countries.id, countryId!))
      .returning();
    return { country: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
