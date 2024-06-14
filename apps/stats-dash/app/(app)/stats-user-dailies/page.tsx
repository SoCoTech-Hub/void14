import StatsUserDailyList from "@/components/statsUserDailies/StatsUserDailyList";
import NewStatsUserDailyModal from "@/components/statsUserDailies/StatsUserDailyModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function StatsUserDailies() {
  await checkAuth();
  const { statsUserDailies } = await api.statsUserDailies.getStatsUserDailies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Stats User Dailies</h1>
        <NewStatsUserDailyModal />
      </div>
      <StatsUserDailyList statsUserDailies={statsUserDailies} />
    </main>
  );
}
