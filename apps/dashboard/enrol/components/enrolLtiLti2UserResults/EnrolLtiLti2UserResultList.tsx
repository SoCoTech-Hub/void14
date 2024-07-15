"use client";
import { CompleteEnrolLtiLti2UserResult } from "@soco/enrol-db/schema/enrolLtiLti2UserResults";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiLti2UserResultModal from "./EnrolLtiLti2UserResultModal";


export default function EnrolLtiLti2UserResultList({ enrolLtiLti2UserResults }: { enrolLtiLti2UserResults: CompleteEnrolLtiLti2UserResult[] }) {
  const { data: e } = trpc.enrolLtiLti2UserResults.getEnrolLtiLti2UserResults.useQuery(undefined, {
    initialData: { enrolLtiLti2UserResults },
    refetchOnMount: false,
  });

  if (e.enrolLtiLti2UserResults.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiLti2UserResults.map((enrolLtiLti2UserResult) => (
        <EnrolLtiLti2UserResult enrolLtiLti2UserResult={enrolLtiLti2UserResult} key={enrolLtiLti2UserResult.id} />
      ))}
    </ul>
  );
}

const EnrolLtiLti2UserResult = ({ enrolLtiLti2UserResult }: { enrolLtiLti2UserResult: CompleteEnrolLtiLti2UserResult }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiLti2UserResult.ltiResultSourcedId}</div>
      </div>
      <EnrolLtiLti2UserResultModal enrolLtiLti2UserResult={enrolLtiLti2UserResult} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti lti2 user results
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti lti2 user result.
      </p>
      <div className="mt-6">
        <EnrolLtiLti2UserResultModal emptyState={true} />
      </div>
    </div>
  );
};

