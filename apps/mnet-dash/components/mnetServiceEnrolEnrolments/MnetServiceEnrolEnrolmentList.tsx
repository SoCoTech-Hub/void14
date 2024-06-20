"use client";
import { CompleteMnetServiceEnrolEnrolment } from "@/lib/db/schema/mnetServiceEnrolEnrolments";
import { trpc } from "@/lib/trpc/client";
import MnetServiceEnrolEnrolmentModal from "./MnetServiceEnrolEnrolmentModal";


export default function MnetServiceEnrolEnrolmentList({ mnetServiceEnrolEnrolments }: { mnetServiceEnrolEnrolments: CompleteMnetServiceEnrolEnrolment[] }) {
  const { data: m } = trpc.mnetServiceEnrolEnrolments.getMnetServiceEnrolEnrolments.useQuery(undefined, {
    initialData: { mnetServiceEnrolEnrolments },
    refetchOnMount: false,
  });

  if (m.mnetServiceEnrolEnrolments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetServiceEnrolEnrolments.map((mnetServiceEnrolEnrolment) => (
        <MnetServiceEnrolEnrolment mnetServiceEnrolEnrolment={mnetServiceEnrolEnrolment} key={mnetServiceEnrolEnrolment.mnetServiceEnrolEnrolment.id} />
      ))}
    </ul>
  );
}

const MnetServiceEnrolEnrolment = ({ mnetServiceEnrolEnrolment }: { mnetServiceEnrolEnrolment: CompleteMnetServiceEnrolEnrolment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetServiceEnrolEnrolment.mnetServiceEnrolEnrolment.enrolTime}</div>
      </div>
      <MnetServiceEnrolEnrolmentModal mnetServiceEnrolEnrolment={mnetServiceEnrolEnrolment.mnetServiceEnrolEnrolment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet service enrol enrolments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet service enrol enrolment.
      </p>
      <div className="mt-6">
        <MnetServiceEnrolEnrolmentModal emptyState={true} />
      </div>
    </div>
  );
};

