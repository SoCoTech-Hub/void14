import { countriesRouter } from "./routers/countries";
import { countryOrganizationsRouter } from "./routers/countryOrganizations";
import { districtOrganizationsRouter } from "./routers/districtOrganizations";
import { districtsRouter } from "./routers/districts";
import { provinceOrganizationsRouter } from "./routers/provinceOrganizations";
import { provincesRouter } from "./routers/provinces";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  countries: countriesRouter,
  countryOrganizations: countryOrganizationsRouter,
  districtOrganizations: districtOrganizationsRouter,
  districts: districtsRouter,
  provinceOrganizations: provinceOrganizationsRouter,
  provinces: provincesRouter,
});

export type AppRouter = typeof appRouter;
