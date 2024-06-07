"use client";
import { CompleteExternalServicesUser } from "@/lib/db/schema/externalServicesUsers";
import { trpc } from "@/lib/trpc/client";
import ExternalServicesUserModal from "./ExternalServicesUserModal";


export default function ExternalServicesUserList({ externalServicesUsers }: { externalServicesUsers: CompleteExternalServicesUser[] }) {
  const { data: e } = trpc.externalServicesUsers.getExternalServicesUsers.useQuery(undefined, {
    initialData: { externalServicesUsers },
    refetchOnMount: false,
  });

  if (e.externalServicesUsers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.externalServicesUsers.map((externalServicesUser) => (
        <ExternalServicesUser externalServicesUser={externalServicesUser} key={externalServicesUser.id} />
      ))}
    </ul>
  );
}

const ExternalServicesUser = ({ externalServicesUser }: { externalServicesUser: CompleteExternalServicesUser }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{externalServicesUser.externalServiceId}</div>
      </div>
      <ExternalServicesUserModal externalServicesUser={externalServicesUser} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No external services users
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new external services user.
      </p>
      <div className="mt-6">
        <ExternalServicesUserModal emptyState={true} />
      </div>
    </div>
  );
};

