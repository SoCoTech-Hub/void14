import StatsDailyList from "@/components/statsDailies/StatsDailyList";
import NewStatsDailyModal from "@/components/statsDailies/StatsDailyModal";
import { api } from "@/lib/trpc/api";

export default async function StatsDailies() {
  const { statsDailies } = await api.statsDailies.getStatsDailies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Stats Dailies</h1>
        <NewStatsDailyModal />
      </div>
      <StatsDailyList statsDailies={statsDailies} />
    </main>
  );
}
