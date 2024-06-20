import CountriesOrganizationList from "@/components/countriesOrganization/CountriesOrganizationList";
import NewCountriesOrganizationModal from "@/components/countriesOrganization/CountriesOrganizationModal";
import { api } from "@/lib/trpc/api";

export default async function CountriesOrganization() {
  const { countriesOrganization } = await api.countriesOrganization.getCountriesOrganization.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Countries Organization</h1>
        <NewCountriesOrganizationModal />
      </div>
      <CountriesOrganizationList countriesOrganization={countriesOrganization} />
    </main>
  );
}
