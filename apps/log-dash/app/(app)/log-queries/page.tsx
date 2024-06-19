import LogQueryList from "@/components/logQueries/LogQueryList";
import NewLogQueryModal from "@/components/logQueries/LogQueryModal";
import { api } from "@/lib/trpc/api";

export default async function LogQueries() {
  const { logQueries } = await api.logQueries.getLogQueries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Log Queries</h1>
        <NewLogQueryModal />
      </div>
      <LogQueryList logQueries={logQueries} />
    </main>
  );
}
