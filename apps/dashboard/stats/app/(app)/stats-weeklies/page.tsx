import StatsWeeklyList from "@/components/statsWeeklies/StatsWeeklyList";
import NewStatsWeeklyModal from "@/components/statsWeeklies/StatsWeeklyModal";
import { api } from "@/lib/trpc/api";

export default async function StatsWeeklies() {
  const { statsWeeklies } = await api.statsWeeklies.getStatsWeeklies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Stats Weeklies</h1>
        <NewStatsWeeklyModal />
      </div>
      <StatsWeeklyList statsWeeklies={statsWeeklies} />
    </main>
  );
}
