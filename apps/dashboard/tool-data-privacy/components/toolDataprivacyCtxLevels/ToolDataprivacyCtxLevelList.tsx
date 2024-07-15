"use client";
import { CompleteToolDataprivacyCtxLevel } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxLevels";
import { trpc } from "@/lib/trpc/client";
import ToolDataprivacyCtxLevelModal from "./ToolDataprivacyCtxLevelModal";


export default function ToolDataprivacyCtxLevelList({ toolDataprivacyCtxLevels }: { toolDataprivacyCtxLevels: CompleteToolDataprivacyCtxLevel[] }) {
  const { data: t } = trpc.toolDataprivacyCtxLevels.getToolDataprivacyCtxLevels.useQuery(undefined, {
    initialData: { toolDataprivacyCtxLevels },
    refetchOnMount: false,
  });

  if (t.toolDataprivacyCtxLevels.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolDataprivacyCtxLevels.map((toolDataprivacyCtxLevel) => (
        <ToolDataprivacyCtxLevel toolDataprivacyCtxLevel={toolDataprivacyCtxLevel} key={toolDataprivacyCtxLevel.toolDataprivacyCtxLevel.id} />
      ))}
    </ul>
  );
}

const ToolDataprivacyCtxLevel = ({ toolDataprivacyCtxLevel }: { toolDataprivacyCtxLevel: CompleteToolDataprivacyCtxLevel }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolDataprivacyCtxLevel.toolDataprivacyCtxLevel.toolDataprivacyCategoryId}</div>
      </div>
      <ToolDataprivacyCtxLevelModal toolDataprivacyCtxLevel={toolDataprivacyCtxLevel.toolDataprivacyCtxLevel} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool dataprivacy ctx levels
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool dataprivacy ctx level.
      </p>
      <div className="mt-6">
        <ToolDataprivacyCtxLevelModal emptyState={true} />
      </div>
    </div>
  );
};

