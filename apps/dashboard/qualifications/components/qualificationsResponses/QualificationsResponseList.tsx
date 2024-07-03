"use client";
import { CompleteQualificationsResponse } from "@/lib/db/schema/qualificationsResponses";
import { trpc } from "@/lib/trpc/client";
import QualificationsResponseModal from "./QualificationsResponseModal";


export default function QualificationsResponseList({ qualificationsResponses }: { qualificationsResponses: CompleteQualificationsResponse[] }) {
  const { data: q } = trpc.qualificationsResponses.getQualificationsResponses.useQuery(undefined, {
    initialData: { qualificationsResponses },
    refetchOnMount: false,
  });

  if (q.qualificationsResponses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qualificationsResponses.map((qualificationsResponse) => (
        <QualificationsResponse qualificationsResponse={qualificationsResponse} key={qualificationsResponse.id} />
      ))}
    </ul>
  );
}

const QualificationsResponse = ({ qualificationsResponse }: { qualificationsResponse: CompleteQualificationsResponse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qualificationsResponse.isSaved}</div>
      </div>
      <QualificationsResponseModal qualificationsResponse={qualificationsResponse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qualifications responses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qualifications response.
      </p>
      <div className="mt-6">
        <QualificationsResponseModal emptyState={true} />
      </div>
    </div>
  );
};

