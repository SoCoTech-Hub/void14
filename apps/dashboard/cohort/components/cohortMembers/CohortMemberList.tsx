"use client";
import { CompleteCohortMember } from "@soco/cohort-db/schema/cohortMembers";
import { trpc } from "@/lib/trpc/client";
import CohortMemberModal from "./CohortMemberModal";


export default function CohortMemberList({ cohortMembers }: { cohortMembers: CompleteCohortMember[] }) {
  const { data: c } = trpc.cohortMembers.getCohortMembers.useQuery(undefined, {
    initialData: { cohortMembers },
    refetchOnMount: false,
  });

  if (c.cohortMembers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.cohortMembers.map((cohortMember) => (
        <CohortMember cohortMember={cohortMember} key={cohortMember.id} />
      ))}
    </ul>
  );
}

const CohortMember = ({ cohortMember }: { cohortMember: CompleteCohortMember }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{cohortMember.cohortId}</div>
      </div>
      <CohortMemberModal cohortMember={cohortMember} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No cohort members
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new cohort member.
      </p>
      <div className="mt-6">
        <CohortMemberModal emptyState={true} />
      </div>
    </div>
  );
};

