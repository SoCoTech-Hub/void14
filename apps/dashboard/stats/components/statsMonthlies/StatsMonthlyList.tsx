"use client";
import { CompleteStatsMonthly } from "@soco/stats-db/schema/statsMonthlies";
import { trpc } from "@/lib/trpc/client";
import StatsMonthlyModal from "./StatsMonthlyModal";


export default function StatsMonthlyList({ statsMonthlies }: { statsMonthlies: CompleteStatsMonthly[] }) {
  const { data: s } = trpc.statsMonthlies.getStatsMonthlies.useQuery(undefined, {
    initialData: { statsMonthlies },
    refetchOnMount: false,
  });

  if (s.statsMonthlies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.statsMonthlies.map((statsMonthly) => (
        <StatsMonthly statsMonthly={statsMonthly} key={statsMonthly.id} />
      ))}
    </ul>
  );
}

const StatsMonthly = ({ statsMonthly }: { statsMonthly: CompleteStatsMonthly }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{statsMonthly.courseId}</div>
      </div>
      <StatsMonthlyModal statsMonthly={statsMonthly} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No stats monthlies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new stats monthly.
      </p>
      <div className="mt-6">
        <StatsMonthlyModal emptyState={true} />
      </div>
    </div>
  );
};

