"use client";
import { CompleteEnrolLtiUser } from "@/lib/db/schema/enrolLtiUsers";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiUserModal from "./EnrolLtiUserModal";


export default function EnrolLtiUserList({ enrolLtiUsers }: { enrolLtiUsers: CompleteEnrolLtiUser[] }) {
  const { data: e } = trpc.enrolLtiUsers.getEnrolLtiUsers.useQuery(undefined, {
    initialData: { enrolLtiUsers },
    refetchOnMount: false,
  });

  if (e.enrolLtiUsers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiUsers.map((enrolLtiUser) => (
        <EnrolLtiUser enrolLtiUser={enrolLtiUser} key={enrolLtiUser.enrolLtiUser.id} />
      ))}
    </ul>
  );
}

const EnrolLtiUser = ({ enrolLtiUser }: { enrolLtiUser: CompleteEnrolLtiUser }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiUser.enrolLtiUser.consumerKey}</div>
      </div>
      <EnrolLtiUserModal enrolLtiUser={enrolLtiUser.enrolLtiUser} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti users
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti user.
      </p>
      <div className="mt-6">
        <EnrolLtiUserModal emptyState={true} />
      </div>
    </div>
  );
};

