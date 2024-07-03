"use client";
import { CompleteOrganization } from "@/lib/db/schema/organizations";
import { trpc } from "@/lib/trpc/client";
import OrganizationModal from "./OrganizationModal";


export default function OrganizationList({ organizations }: { organizations: CompleteOrganization[] }) {
  const { data: o } = trpc.organizations.getOrganizations.useQuery(undefined, {
    initialData: { organizations },
    refetchOnMount: false,
  });

  if (o.organizations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {o.organizations.map((organization) => (
        <Organization organization={organization} key={organization.id} />
      ))}
    </ul>
  );
}

const Organization = ({ organization }: { organization: CompleteOrganization }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{organization.name}</div>
      </div>
      <OrganizationModal organization={organization} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No organizations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new organization.
      </p>
      <div className="mt-6">
        <OrganizationModal emptyState={true} />
      </div>
    </div>
  );
};

