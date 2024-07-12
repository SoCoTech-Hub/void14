import type { CountryOrganizationId } from "@soco/geolocalize-db/schema/countryOrganizations";
import { eq } from "@soco/geolocalize-db";
import { db } from "@soco/geolocalize-db/client";
import { countries } from "@soco/geolocalize-db/schema/countries";
import {
  countryOrganizationIdSchema,
  countryOrganizations,
} from "@soco/geolocalize-db/schema/countryOrganizations";

export const getCountryOrganizations = async () => {
  const rows = await db
    .select({ countryOrganization: countryOrganizations, country: countries })
    .from(countryOrganizations)
    .leftJoin(countries, eq(countryOrganizations.countryId, countries.id));
  const c = rows.map((r) => ({ ...r.countryOrganization, country: r.country }));
  return { countryOrganizations: c };
};

export const getCountryOrganizationById = async (id: CountryOrganizationId) => {
  const { id: countryOrganizationId } = countryOrganizationIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({ countryOrganization: countryOrganizations, country: countries })
    .from(countryOrganizations)
    .where(eq(countryOrganizations.id, countryOrganizationId))
    .leftJoin(countries, eq(countryOrganizations.countryId, countries.id));
  if (row === undefined) return {};
  const c = { ...row.countryOrganization, country: row.country };
  return { countryOrganization: c };
};
