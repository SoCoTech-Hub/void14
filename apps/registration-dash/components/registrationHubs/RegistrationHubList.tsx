"use client";
import { CompleteRegistrationHub } from "@/lib/db/schema/registrationHubs";
import { trpc } from "@/lib/trpc/client";
import RegistrationHubModal from "./RegistrationHubModal";


export default function RegistrationHubList({ registrationHubs }: { registrationHubs: CompleteRegistrationHub[] }) {
  const { data: r } = trpc.registrationHubs.getRegistrationHubs.useQuery(undefined, {
    initialData: { registrationHubs },
    refetchOnMount: false,
  });

  if (r.registrationHubs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.registrationHubs.map((registrationHub) => (
        <RegistrationHub registrationHub={registrationHub} key={registrationHub.id} />
      ))}
    </ul>
  );
}

const RegistrationHub = ({ registrationHub }: { registrationHub: CompleteRegistrationHub }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{registrationHub.confirmed}</div>
      </div>
      <RegistrationHubModal registrationHub={registrationHub} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No registration hubs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new registration hub.
      </p>
      <div className="mt-6">
        <RegistrationHubModal emptyState={true} />
      </div>
    </div>
  );
};

