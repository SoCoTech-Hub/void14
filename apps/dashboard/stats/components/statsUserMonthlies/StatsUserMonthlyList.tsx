"use client";
import { CompleteStatsUserMonthly } from "@soco/stats-db/schema/statsUserMonthlies";
import { trpc } from "@/lib/trpc/client";
import StatsUserMonthlyModal from "./StatsUserMonthlyModal";


export default function StatsUserMonthlyList({ statsUserMonthlies }: { statsUserMonthlies: CompleteStatsUserMonthly[] }) {
  const { data: s } = trpc.statsUserMonthlies.getStatsUserMonthlies.useQuery(undefined, {
    initialData: { statsUserMonthlies },
    refetchOnMount: false,
  });

  if (s.statsUserMonthlies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.statsUserMonthlies.map((statsUserMonthly) => (
        <StatsUserMonthly statsUserMonthly={statsUserMonthly} key={statsUserMonthly.id} />
      ))}
    </ul>
  );
}

const StatsUserMonthly = ({ statsUserMonthly }: { statsUserMonthly: CompleteStatsUserMonthly }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{statsUserMonthly.courseId}</div>
      </div>
      <StatsUserMonthlyModal statsUserMonthly={statsUserMonthly} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No stats user monthlies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new stats user monthly.
      </p>
      <div className="mt-6">
        <StatsUserMonthlyModal emptyState={true} />
      </div>
    </div>
  );
};

