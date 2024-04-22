"use client";
import { CompleteAssignFeedbackFile } from "@/lib/db/schema/assignFeedbackFiles";
import { trpc } from "@/lib/trpc/client";
import AssignFeedbackFileModal from "./AssignFeedbackFileModal";


export default function AssignFeedbackFileList({ assignFeedbackFiles }: { assignFeedbackFiles: CompleteAssignFeedbackFile[] }) {
  const { data: a } = trpc.assignFeedbackFiles.getAssignFeedbackFiles.useQuery(undefined, {
    initialData: { assignFeedbackFiles },
    refetchOnMount: false,
  });

  if (a.assignFeedbackFiles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignFeedbackFiles.map((assignFeedbackFile) => (
        <AssignFeedbackFile assignFeedbackFile={assignFeedbackFile} key={assignFeedbackFile.assignFeedbackFile.id} />
      ))}
    </ul>
  );
}

const AssignFeedbackFile = ({ assignFeedbackFile }: { assignFeedbackFile: CompleteAssignFeedbackFile }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignFeedbackFile.assignFeedbackFile.assignmentId}</div>
      </div>
      <AssignFeedbackFileModal assignFeedbackFile={assignFeedbackFile.assignFeedbackFile} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign feedback files
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign feedback file.
      </p>
      <div className="mt-6">
        <AssignFeedbackFileModal emptyState={true} />
      </div>
    </div>
  );
};

