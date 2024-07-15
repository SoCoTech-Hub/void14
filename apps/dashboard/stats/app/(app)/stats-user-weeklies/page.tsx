import StatsUserWeeklyList from "@/components/statsUserWeeklies/StatsUserWeeklyList";
import NewStatsUserWeeklyModal from "@/components/statsUserWeeklies/StatsUserWeeklyModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function StatsUserWeeklies() {
  await checkAuth();
  const { statsUserWeeklies } = await api.statsUserWeeklies.getStatsUserWeeklies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Stats User Weeklies</h1>
        <NewStatsUserWeeklyModal />
      </div>
      <StatsUserWeeklyList statsUserWeeklies={statsUserWeeklies} />
    </main>
  );
}
