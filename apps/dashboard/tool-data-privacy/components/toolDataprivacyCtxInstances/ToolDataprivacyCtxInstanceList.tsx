"use client";
import { CompleteToolDataprivacyCtxInstance } from "@/lib/db/schema/toolDataprivacyCtxInstances";
import { trpc } from "@/lib/trpc/client";
import ToolDataprivacyCtxInstanceModal from "./ToolDataprivacyCtxInstanceModal";


export default function ToolDataprivacyCtxInstanceList({ toolDataprivacyCtxInstances }: { toolDataprivacyCtxInstances: CompleteToolDataprivacyCtxInstance[] }) {
  const { data: t } = trpc.toolDataprivacyCtxInstances.getToolDataprivacyCtxInstances.useQuery(undefined, {
    initialData: { toolDataprivacyCtxInstances },
    refetchOnMount: false,
  });

  if (t.toolDataprivacyCtxInstances.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolDataprivacyCtxInstances.map((toolDataprivacyCtxInstance) => (
        <ToolDataprivacyCtxInstance toolDataprivacyCtxInstance={toolDataprivacyCtxInstance} key={toolDataprivacyCtxInstance.toolDataprivacyCtxInstance.id} />
      ))}
    </ul>
  );
}

const ToolDataprivacyCtxInstance = ({ toolDataprivacyCtxInstance }: { toolDataprivacyCtxInstance: CompleteToolDataprivacyCtxInstance }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolDataprivacyCtxInstance.toolDataprivacyCtxInstance.toolDataprivacyCategoryId}</div>
      </div>
      <ToolDataprivacyCtxInstanceModal toolDataprivacyCtxInstance={toolDataprivacyCtxInstance.toolDataprivacyCtxInstance} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool dataprivacy ctx instances
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool dataprivacy ctx instance.
      </p>
      <div className="mt-6">
        <ToolDataprivacyCtxInstanceModal emptyState={true} />
      </div>
    </div>
  );
};

