import StatsMonthlyList from "@/components/statsMonthlies/StatsMonthlyList";
import NewStatsMonthlyModal from "@/components/statsMonthlies/StatsMonthlyModal";
import { api } from "@/lib/trpc/api";

export default async function StatsMonthlies() {
  const { statsMonthlies } = await api.statsMonthlies.getStatsMonthlies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Stats Monthlies</h1>
        <NewStatsMonthlyModal />
      </div>
      <StatsMonthlyList statsMonthlies={statsMonthlies} />
    </main>
  );
}
