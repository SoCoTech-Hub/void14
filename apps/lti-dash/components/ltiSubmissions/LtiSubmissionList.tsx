"use client";
import { CompleteLtiSubmission } from "@/lib/db/schema/ltiSubmissions";
import { trpc } from "@/lib/trpc/client";
import LtiSubmissionModal from "./LtiSubmissionModal";


export default function LtiSubmissionList({ ltiSubmissions }: { ltiSubmissions: CompleteLtiSubmission[] }) {
  const { data: l } = trpc.ltiSubmissions.getLtiSubmissions.useQuery(undefined, {
    initialData: { ltiSubmissions },
    refetchOnMount: false,
  });

  if (l.ltiSubmissions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.ltiSubmissions.map((ltiSubmission) => (
        <LtiSubmission ltiSubmission={ltiSubmission} key={ltiSubmission.id} />
      ))}
    </ul>
  );
}

const LtiSubmission = ({ ltiSubmission }: { ltiSubmission: CompleteLtiSubmission }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{ltiSubmission.dateSubmitted.toString()}</div>
      </div>
      <LtiSubmissionModal ltiSubmission={ltiSubmission} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lti submissions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lti submission.
      </p>
      <div className="mt-6">
        <LtiSubmissionModal emptyState={true} />
      </div>
    </div>
  );
};

