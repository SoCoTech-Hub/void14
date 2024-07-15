"use client";
import { CompleteStatsDaily } from "@soco/stats-db/schema/statsDailies";
import { trpc } from "@/lib/trpc/client";
import StatsDailyModal from "./StatsDailyModal";


export default function StatsDailyList({ statsDailies }: { statsDailies: CompleteStatsDaily[] }) {
  const { data: s } = trpc.statsDailies.getStatsDailies.useQuery(undefined, {
    initialData: { statsDailies },
    refetchOnMount: false,
  });

  if (s.statsDailies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.statsDailies.map((statsDaily) => (
        <StatsDaily statsDaily={statsDaily} key={statsDaily.id} />
      ))}
    </ul>
  );
}

const StatsDaily = ({ statsDaily }: { statsDaily: CompleteStatsDaily }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{statsDaily.courseId}</div>
      </div>
      <StatsDailyModal statsDaily={statsDaily} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No stats dailies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new stats daily.
      </p>
      <div className="mt-6">
        <StatsDailyModal emptyState={true} />
      </div>
    </div>
  );
};

