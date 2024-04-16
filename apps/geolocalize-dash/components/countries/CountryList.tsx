"use client";
import { CompleteCountry } from "@/lib/db/schema/countries";
import { trpc } from "@/lib/trpc/client";
import CountryModal from "./CountryModal";


export default function CountryList({ countries }: { countries: CompleteCountry[] }) {
  const { data: c } = trpc.countries.getCountries.useQuery(undefined, {
    initialData: { countries },
    refetchOnMount: false,
  });

  if (c.countries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.countries.map((country) => (
        <Country country={country} key={country.id} />
      ))}
    </ul>
  );
}

const Country = ({ country }: { country: CompleteCountry }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{country.name}</div>
      </div>
      <CountryModal country={country} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No countries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new country.
      </p>
      <div className="mt-6">
        <CountryModal emptyState={true} />
      </div>
    </div>
  );
};

