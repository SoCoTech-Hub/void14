import CountryList from "@/components/countries/CountryList";
import NewCountryModal from "@/components/countries/CountryModal";
import { api } from "@/lib/trpc/api";

export default async function Countries() {
  const { countries } = await api.countries.getCountries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Countries</h1>
        <NewCountryModal />
      </div>
      <CountryList countries={countries} />
    </main>
  );
}
