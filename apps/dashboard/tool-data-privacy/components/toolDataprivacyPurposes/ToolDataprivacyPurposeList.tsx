"use client";
import { CompleteToolDataprivacyPurpose } from "@soco/tool-data-privacy-db/schema/toolDataprivacyPurposes";
import { trpc } from "@/lib/trpc/client";
import ToolDataprivacyPurposeModal from "./ToolDataprivacyPurposeModal";


export default function ToolDataprivacyPurposeList({ toolDataprivacyPurposes }: { toolDataprivacyPurposes: CompleteToolDataprivacyPurpose[] }) {
  const { data: t } = trpc.toolDataprivacyPurposes.getToolDataprivacyPurposes.useQuery(undefined, {
    initialData: { toolDataprivacyPurposes },
    refetchOnMount: false,
  });

  if (t.toolDataprivacyPurposes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolDataprivacyPurposes.map((toolDataprivacyPurpose) => (
        <ToolDataprivacyPurpose toolDataprivacyPurpose={toolDataprivacyPurpose} key={toolDataprivacyPurpose.id} />
      ))}
    </ul>
  );
}

const ToolDataprivacyPurpose = ({ toolDataprivacyPurpose }: { toolDataprivacyPurpose: CompleteToolDataprivacyPurpose }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolDataprivacyPurpose.description}</div>
      </div>
      <ToolDataprivacyPurposeModal toolDataprivacyPurpose={toolDataprivacyPurpose} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool dataprivacy purposes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool dataprivacy purpose.
      </p>
      <div className="mt-6">
        <ToolDataprivacyPurposeModal emptyState={true} />
      </div>
    </div>
  );
};

