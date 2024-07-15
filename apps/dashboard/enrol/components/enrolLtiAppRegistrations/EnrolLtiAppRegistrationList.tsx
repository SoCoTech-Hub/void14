"use client";
import { CompleteEnrolLtiAppRegistration } from "@soco/enrol-db/schema/enrolLtiAppRegistrations";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiAppRegistrationModal from "./EnrolLtiAppRegistrationModal";


export default function EnrolLtiAppRegistrationList({ enrolLtiAppRegistrations }: { enrolLtiAppRegistrations: CompleteEnrolLtiAppRegistration[] }) {
  const { data: e } = trpc.enrolLtiAppRegistrations.getEnrolLtiAppRegistrations.useQuery(undefined, {
    initialData: { enrolLtiAppRegistrations },
    refetchOnMount: false,
  });

  if (e.enrolLtiAppRegistrations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiAppRegistrations.map((enrolLtiAppRegistration) => (
        <EnrolLtiAppRegistration enrolLtiAppRegistration={enrolLtiAppRegistration} key={enrolLtiAppRegistration.id} />
      ))}
    </ul>
  );
}

const EnrolLtiAppRegistration = ({ enrolLtiAppRegistration }: { enrolLtiAppRegistration: CompleteEnrolLtiAppRegistration }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiAppRegistration.accessTokenUrl}</div>
      </div>
      <EnrolLtiAppRegistrationModal enrolLtiAppRegistration={enrolLtiAppRegistration} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti app registrations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti app registration.
      </p>
      <div className="mt-6">
        <EnrolLtiAppRegistrationModal emptyState={true} />
      </div>
    </div>
  );
};

