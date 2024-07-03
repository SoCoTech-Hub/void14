"use client";
import { CompleteCountriesOrganization } from "@/lib/db/schema/countriesOrganization";
import { trpc } from "@/lib/trpc/client";
import CountriesOrganizationModal from "./CountriesOrganizationModal";


export default function CountriesOrganizationList({ countriesOrganization }: { countriesOrganization: CompleteCountriesOrganization[] }) {
  const { data: c } = trpc.countriesOrganization.getCountriesOrganization.useQuery(undefined, {
    initialData: { countriesOrganization },
    refetchOnMount: false,
  });

  if (c.countriesOrganization.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.countriesOrganization.map((countriesOrganization) => (
        <CountriesOrganization countriesOrganization={countriesOrganization} key={countriesOrganization.countriesOrganization.id} />
      ))}
    </ul>
  );
}

const CountriesOrganization = ({ countriesOrganization }: { countriesOrganization: CompleteCountriesOrganization }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{countriesOrganization.countriesOrganization.countryId}</div>
      </div>
      <CountriesOrganizationModal countriesOrganization={countriesOrganization.countriesOrganization} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No countries organization
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new countries organization.
      </p>
      <div className="mt-6">
        <CountriesOrganizationModal emptyState={true} />
      </div>
    </div>
  );
};

