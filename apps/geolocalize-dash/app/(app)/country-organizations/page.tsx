import CountryOrganizationList from "@/components/countryOrganizations/CountryOrganizationList";
import NewCountryOrganizationModal from "@/components/countryOrganizations/CountryOrganizationModal";
import { api } from "@/lib/trpc/api";

export default async function CountryOrganizations() {
  const { countryOrganizations } = await api.countryOrganizations.getCountryOrganizations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Country Organizations</h1>
        <NewCountryOrganizationModal />
      </div>
      <CountryOrganizationList countryOrganizations={countryOrganizations} />
    </main>
  );
}
