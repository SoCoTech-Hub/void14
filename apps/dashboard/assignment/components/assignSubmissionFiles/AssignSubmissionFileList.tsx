"use client";
import { CompleteAssignSubmissionFile } from "@soco/assignment-db/schema/assignSubmissionFiles";
import { trpc } from "@/lib/trpc/client";
import AssignSubmissionFileModal from "./AssignSubmissionFileModal";


export default function AssignSubmissionFileList({ assignSubmissionFiles }: { assignSubmissionFiles: CompleteAssignSubmissionFile[] }) {
  const { data: a } = trpc.assignSubmissionFiles.getAssignSubmissionFiles.useQuery(undefined, {
    initialData: { assignSubmissionFiles },
    refetchOnMount: false,
  });

  if (a.assignSubmissionFiles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignSubmissionFiles.map((assignSubmissionFile) => (
        <AssignSubmissionFile assignSubmissionFile={assignSubmissionFile} key={assignSubmissionFile.assignSubmissionFile.id} />
      ))}
    </ul>
  );
}

const AssignSubmissionFile = ({ assignSubmissionFile }: { assignSubmissionFile: CompleteAssignSubmissionFile }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignSubmissionFile.assignSubmissionFile.assignmentId}</div>
      </div>
      <AssignSubmissionFileModal assignSubmissionFile={assignSubmissionFile.assignSubmissionFile} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign submission files
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign submission file.
      </p>
      <div className="mt-6">
        <AssignSubmissionFileModal emptyState={true} />
      </div>
    </div>
  );
};

