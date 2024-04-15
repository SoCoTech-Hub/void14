"use client";
import { CompleteApplicationResponse } from "@/lib/db/schema/applicationResponses";
import { trpc } from "@/lib/trpc/client";
import ApplicationResponseModal from "./ApplicationResponseModal";


export default function ApplicationResponseList({ applicationResponses }: { applicationResponses: CompleteApplicationResponse[] }) {
  const { data: a } = trpc.applicationResponses.getApplicationResponses.useQuery(undefined, {
    initialData: { applicationResponses },
    refetchOnMount: false,
  });

  if (a.applicationResponses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.applicationResponses.map((applicationResponse) => (
        <ApplicationResponse applicationResponse={applicationResponse} key={applicationResponse.id} />
      ))}
    </ul>
  );
}

const ApplicationResponse = ({ applicationResponse }: { applicationResponse: CompleteApplicationResponse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full flex flex-row gap-x-2">
        <div>{applicationResponse.jobApplicationId}</div>
        <div>{applicationResponse.jobApplication?.name}</div>
      </div>
      <ApplicationResponseModal applicationResponse={applicationResponse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No application responses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new application response.
      </p>
      <div className="mt-6">
        <ApplicationResponseModal emptyState={true} />
      </div>
    </div>
  );
};

