import DataRecordList from "@/components/dataRecords/DataRecordList";
import NewDataRecordModal from "@/components/dataRecords/DataRecordModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function DataRecords() {
  await checkAuth();
  const { dataRecords } = await api.dataRecords.getDataRecords.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Data Records</h1>
        <NewDataRecordModal />
      </div>
      <DataRecordList dataRecords={dataRecords} />
    </main>
  );
}
