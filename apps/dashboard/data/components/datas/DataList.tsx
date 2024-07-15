"use client";
import { CompleteData } from "@soco/data-db/schema/datas";
import { trpc } from "@/lib/trpc/client";
import DataModal from "./DataModal";


export default function DataList({ datas }: { datas: CompleteData[] }) {
  const { data: d } = trpc.datas.getDatas.useQuery(undefined, {
    initialData: { datas },
    refetchOnMount: false,
  });

  if (d.datas.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.datas.map((data) => (
        <Data data={data} key={data.id} />
      ))}
    </ul>
  );
}

const Data = ({ data }: { data: CompleteData }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{data.addTemplate}</div>
      </div>
      <DataModal data={data} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No datas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new data.
      </p>
      <div className="mt-6">
        <DataModal emptyState={true} />
      </div>
    </div>
  );
};

