"use client";
import { CompleteDataContent } from "@soco/data-db/schema/dataContents";
import { trpc } from "@/lib/trpc/client";
import DataContentModal from "./DataContentModal";


export default function DataContentList({ dataContents }: { dataContents: CompleteDataContent[] }) {
  const { data: d } = trpc.dataContents.getDataContents.useQuery(undefined, {
    initialData: { dataContents },
    refetchOnMount: false,
  });

  if (d.dataContents.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.dataContents.map((dataContent) => (
        <DataContent dataContent={dataContent} key={dataContent.dataContent.id} />
      ))}
    </ul>
  );
}

const DataContent = ({ dataContent }: { dataContent: CompleteDataContent }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{dataContent.dataContent.content}</div>
      </div>
      <DataContentModal dataContent={dataContent.dataContent} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No data contents
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new data content.
      </p>
      <div className="mt-6">
        <DataContentModal emptyState={true} />
      </div>
    </div>
  );
};

