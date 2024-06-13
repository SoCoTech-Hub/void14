"use client";
import { CompleteToolDataprivacyRequest } from "@/lib/db/schema/toolDataprivacyRequests";
import { trpc } from "@/lib/trpc/client";
import ToolDataprivacyRequestModal from "./ToolDataprivacyRequestModal";


export default function ToolDataprivacyRequestList({ toolDataprivacyRequests }: { toolDataprivacyRequests: CompleteToolDataprivacyRequest[] }) {
  const { data: t } = trpc.toolDataprivacyRequests.getToolDataprivacyRequests.useQuery(undefined, {
    initialData: { toolDataprivacyRequests },
    refetchOnMount: false,
  });

  if (t.toolDataprivacyRequests.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolDataprivacyRequests.map((toolDataprivacyRequest) => (
        <ToolDataprivacyRequest toolDataprivacyRequest={toolDataprivacyRequest} key={toolDataprivacyRequest.id} />
      ))}
    </ul>
  );
}

const ToolDataprivacyRequest = ({ toolDataprivacyRequest }: { toolDataprivacyRequest: CompleteToolDataprivacyRequest }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolDataprivacyRequest.comments}</div>
      </div>
      <ToolDataprivacyRequestModal toolDataprivacyRequest={toolDataprivacyRequest} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool dataprivacy requests
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool dataprivacy request.
      </p>
      <div className="mt-6">
        <ToolDataprivacyRequestModal emptyState={true} />
      </div>
    </div>
  );
};

