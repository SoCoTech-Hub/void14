"use client";
import { CompleteDataRecord } from "@soco/data-db/schema/dataRecords";
import { trpc } from "@/lib/trpc/client";
import DataRecordModal from "./DataRecordModal";


export default function DataRecordList({ dataRecords }: { dataRecords: CompleteDataRecord[] }) {
  const { data: d } = trpc.dataRecords.getDataRecords.useQuery(undefined, {
    initialData: { dataRecords },
    refetchOnMount: false,
  });

  if (d.dataRecords.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.dataRecords.map((dataRecord) => (
        <DataRecord dataRecord={dataRecord} key={dataRecord.dataRecord.id} />
      ))}
    </ul>
  );
}

const DataRecord = ({ dataRecord }: { dataRecord: CompleteDataRecord }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{dataRecord.dataRecord.approved}</div>
      </div>
      <DataRecordModal dataRecord={dataRecord.dataRecord} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No data records
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new data record.
      </p>
      <div className="mt-6">
        <DataRecordModal emptyState={true} />
      </div>
    </div>
  );
};

