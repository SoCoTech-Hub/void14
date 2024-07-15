"use client";
import { CompleteToolDataprivacyCtxExpired } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxExpireds";
import { trpc } from "@/lib/trpc/client";
import ToolDataprivacyCtxExpiredModal from "./ToolDataprivacyCtxExpiredModal";


export default function ToolDataprivacyCtxExpiredList({ toolDataprivacyCtxExpireds }: { toolDataprivacyCtxExpireds: CompleteToolDataprivacyCtxExpired[] }) {
  const { data: t } = trpc.toolDataprivacyCtxExpireds.getToolDataprivacyCtxExpireds.useQuery(undefined, {
    initialData: { toolDataprivacyCtxExpireds },
    refetchOnMount: false,
  });

  if (t.toolDataprivacyCtxExpireds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolDataprivacyCtxExpireds.map((toolDataprivacyCtxExpired) => (
        <ToolDataprivacyCtxExpired toolDataprivacyCtxExpired={toolDataprivacyCtxExpired} key={toolDataprivacyCtxExpired.id} />
      ))}
    </ul>
  );
}

const ToolDataprivacyCtxExpired = ({ toolDataprivacyCtxExpired }: { toolDataprivacyCtxExpired: CompleteToolDataprivacyCtxExpired }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolDataprivacyCtxExpired.contextId}</div>
      </div>
      <ToolDataprivacyCtxExpiredModal toolDataprivacyCtxExpired={toolDataprivacyCtxExpired} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool dataprivacy ctx expireds
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool dataprivacy ctx expired.
      </p>
      <div className="mt-6">
        <ToolDataprivacyCtxExpiredModal emptyState={true} />
      </div>
    </div>
  );
};

