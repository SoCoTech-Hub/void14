"use client";
import { CompleteAssignUserMapping } from "@soco/assignment-db/schema/assignUserMappings";
import { trpc } from "@/lib/trpc/client";
import AssignUserMappingModal from "./AssignUserMappingModal";


export default function AssignUserMappingList({ assignUserMappings }: { assignUserMappings: CompleteAssignUserMapping[] }) {
  const { data: a } = trpc.assignUserMappings.getAssignUserMappings.useQuery(undefined, {
    initialData: { assignUserMappings },
    refetchOnMount: false,
  });

  if (a.assignUserMappings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignUserMappings.map((assignUserMapping) => (
        <AssignUserMapping assignUserMapping={assignUserMapping} key={assignUserMapping.assignUserMapping.id} />
      ))}
    </ul>
  );
}

const AssignUserMapping = ({ assignUserMapping }: { assignUserMapping: CompleteAssignUserMapping }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignUserMapping.assignUserMapping.assignmentId}</div>
      </div>
      <AssignUserMappingModal assignUserMapping={assignUserMapping.assignUserMapping} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign user mappings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign user mapping.
      </p>
      <div className="mt-6">
        <AssignUserMappingModal emptyState={true} />
      </div>
    </div>
  );
};

