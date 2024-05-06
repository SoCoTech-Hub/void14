"use client";
import { CompleteCohort } from "@/lib/db/schema/cohorts";
import { trpc } from "@/lib/trpc/client";
import CohortModal from "./CohortModal";


export default function CohortList({ cohorts }: { cohorts: CompleteCohort[] }) {
  const { data: c } = trpc.cohorts.getCohorts.useQuery(undefined, {
    initialData: { cohorts },
    refetchOnMount: false,
  });

  if (c.cohorts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.cohorts.map((cohort) => (
        <Cohort cohort={cohort} key={cohort.id} />
      ))}
    </ul>
  );
}

const Cohort = ({ cohort }: { cohort: CompleteCohort }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{cohort.component}</div>
      </div>
      <CohortModal cohort={cohort} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No cohorts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new cohort.
      </p>
      <div className="mt-6">
        <CohortModal emptyState={true} />
      </div>
    </div>
  );
};

