"use client";
import { CompleteAssignment } from "@/lib/db/schema/assignments";
import { trpc } from "@/lib/trpc/client";
import AssignmentModal from "./AssignmentModal";


export default function AssignmentList({ assignments }: { assignments: CompleteAssignment[] }) {
  const { data: a } = trpc.assignments.getAssignments.useQuery(undefined, {
    initialData: { assignments },
    refetchOnMount: false,
  });

  if (a.assignments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignments.map((assignment) => (
        <Assignment assignment={assignment} key={assignment.id} />
      ))}
    </ul>
  );
}

const Assignment = ({ assignment }: { assignment: CompleteAssignment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignment.assignmentType}</div>
      </div>
      <AssignmentModal assignment={assignment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assignments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assignment.
      </p>
      <div className="mt-6">
        <AssignmentModal emptyState={true} />
      </div>
    </div>
  );
};

