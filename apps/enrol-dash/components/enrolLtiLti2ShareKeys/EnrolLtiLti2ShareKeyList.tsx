"use client";
import { CompleteEnrolLtiLti2ShareKey } from "@/lib/db/schema/enrolLtiLti2ShareKeys";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiLti2ShareKeyModal from "./EnrolLtiLti2ShareKeyModal";


export default function EnrolLtiLti2ShareKeyList({ enrolLtiLti2ShareKeys }: { enrolLtiLti2ShareKeys: CompleteEnrolLtiLti2ShareKey[] }) {
  const { data: e } = trpc.enrolLtiLti2ShareKeys.getEnrolLtiLti2ShareKeys.useQuery(undefined, {
    initialData: { enrolLtiLti2ShareKeys },
    refetchOnMount: false,
  });

  if (e.enrolLtiLti2ShareKeys.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiLti2ShareKeys.map((enrolLtiLti2ShareKey) => (
        <EnrolLtiLti2ShareKey enrolLtiLti2ShareKey={enrolLtiLti2ShareKey} key={enrolLtiLti2ShareKey.id} />
      ))}
    </ul>
  );
}

const EnrolLtiLti2ShareKey = ({ enrolLtiLti2ShareKey }: { enrolLtiLti2ShareKey: CompleteEnrolLtiLti2ShareKey }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiLti2ShareKey.autoApprove}</div>
      </div>
      <EnrolLtiLti2ShareKeyModal enrolLtiLti2ShareKey={enrolLtiLti2ShareKey} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti lti2 share keys
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti lti2 share key.
      </p>
      <div className="mt-6">
        <EnrolLtiLti2ShareKeyModal emptyState={true} />
      </div>
    </div>
  );
};

