"use client";
import { CompleteCountryOrganization } from "@/lib/db/schema/countryOrganizations";
import { trpc } from "@/lib/trpc/client";
import CountryOrganizationModal from "./CountryOrganizationModal";


export default function CountryOrganizationList({ countryOrganizations }: { countryOrganizations: CompleteCountryOrganization[] }) {
  const { data: c } = trpc.countryOrganizations.getCountryOrganizations.useQuery(undefined, {
    initialData: { countryOrganizations },
    refetchOnMount: false,
  });

  if (c.countryOrganizations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.countryOrganizations.map((countryOrganization) => (
        <CountryOrganization countryOrganization={countryOrganization} key={countryOrganization.countryOrganization.id} />
      ))}
    </ul>
  );
}

const CountryOrganization = ({ countryOrganization }: { countryOrganization: CompleteCountryOrganization }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{countryOrganization.countryOrganization.countryId}</div>
      </div>
      <CountryOrganizationModal countryOrganization={countryOrganization.countryOrganization} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No country organizations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new country organization.
      </p>
      <div className="mt-6">
        <CountryOrganizationModal emptyState={true} />
      </div>
    </div>
  );
};

