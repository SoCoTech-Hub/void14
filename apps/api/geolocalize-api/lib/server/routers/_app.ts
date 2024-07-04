import { router } from '../server/trpc'
import { countriesRouter } from './countries'
import { provincesRouter } from './provinces'
import { districtsRouter } from './districts'
import { districtOrganizationsRouter } from "./districtOrganizations";
import { countryOrganizationsRouter } from "./countryOrganizations";
import { provinceOrganizationsRouter } from "./provinceOrganizations";

export const appRouter = router({
	countries: countriesRouter,
	provinces: provincesRouter,
	districts: districtsRouter
})

export type AppRouter = typeof appRouter

  districtOrganizations: districtOrganizationsRouter,
  countryOrganizations: countryOrganizationsRouter,
  provinceOrganizations: provinceOrganizationsRouter,
