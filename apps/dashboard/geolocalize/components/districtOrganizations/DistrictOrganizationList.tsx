"use client";
import { CompleteDistrictOrganization } from "@soco/geolocalize-db/schema/districtOrganizations";
import { trpc } from "@/lib/trpc/client";
import DistrictOrganizationModal from "./DistrictOrganizationModal";


export default function DistrictOrganizationList({ districtOrganizations }: { districtOrganizations: CompleteDistrictOrganization[] }) {
  const { data: d } = trpc.districtOrganizations.getDistrictOrganizations.useQuery(undefined, {
    initialData: { districtOrganizations },
    refetchOnMount: false,
  });

  if (d.districtOrganizations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.districtOrganizations.map((districtOrganization) => (
        <DistrictOrganization districtOrganization={districtOrganization} key={districtOrganization.districtOrganization.id} />
      ))}
    </ul>
  );
}

const DistrictOrganization = ({ districtOrganization }: { districtOrganization: CompleteDistrictOrganization }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{districtOrganization.districtOrganization.districtId}</div>
      </div>
      <DistrictOrganizationModal districtOrganization={districtOrganization.districtOrganization} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No district organizations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new district organization.
      </p>
      <div className="mt-6">
        <DistrictOrganizationModal emptyState={true} />
      </div>
    </div>
  );
};

