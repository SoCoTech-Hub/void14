"use client";
import { CompleteProvinceOrganization } from "@soco/geolocalize-db/schema/provinceOrganizations";
import { trpc } from "@/lib/trpc/client";
import ProvinceOrganizationModal from "./ProvinceOrganizationModal";


export default function ProvinceOrganizationList({ provinceOrganizations }: { provinceOrganizations: CompleteProvinceOrganization[] }) {
  const { data: p } = trpc.provinceOrganizations.getProvinceOrganizations.useQuery(undefined, {
    initialData: { provinceOrganizations },
    refetchOnMount: false,
  });

  if (p.provinceOrganizations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.provinceOrganizations.map((provinceOrganization) => (
        <ProvinceOrganization provinceOrganization={provinceOrganization} key={provinceOrganization.provinceOrganization.id} />
      ))}
    </ul>
  );
}

const ProvinceOrganization = ({ provinceOrganization }: { provinceOrganization: CompleteProvinceOrganization }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{provinceOrganization.provinceOrganization.provinceId}</div>
      </div>
      <ProvinceOrganizationModal provinceOrganization={provinceOrganization.provinceOrganization} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No province organizations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new province organization.
      </p>
      <div className="mt-6">
        <ProvinceOrganizationModal emptyState={true} />
      </div>
    </div>
  );
};

