import LogDisplayList from "@/components/logDisplays/LogDisplayList";
import NewLogDisplayModal from "@/components/logDisplays/LogDisplayModal";
import { api } from "@/lib/trpc/api";

export default async function LogDisplays() {
  const { logDisplays } = await api.logDisplays.getLogDisplays.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Log Displays</h1>
        <NewLogDisplayModal />
      </div>
      <LogDisplayList logDisplays={logDisplays} />
    </main>
  );
}
