import StatsUserMonthlyList from "@/components/statsUserMonthlies/StatsUserMonthlyList";
import NewStatsUserMonthlyModal from "@/components/statsUserMonthlies/StatsUserMonthlyModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function StatsUserMonthlies() {
  await checkAuth();
  const { statsUserMonthlies } = await api.statsUserMonthlies.getStatsUserMonthlies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Stats User Monthlies</h1>
        <NewStatsUserMonthlyModal />
      </div>
      <StatsUserMonthlyList statsUserMonthlies={statsUserMonthlies} />
    </main>
  );
}
