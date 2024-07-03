"use client";
import { CompleteQuize } from "@/lib/db/schema/quizes";
import { trpc } from "@/lib/trpc/client";
import QuizeModal from "./QuizeModal";


export default function QuizeList({ quizes }: { quizes: CompleteQuize[] }) {
  const { data: q } = trpc.quizes.getQuizes.useQuery(undefined, {
    initialData: { quizes },
    refetchOnMount: false,
  });

  if (q.quizes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizes.map((quize) => (
        <Quize quize={quize} key={quize.id} />
      ))}
    </ul>
  );
}

const Quize = ({ quize }: { quize: CompleteQuize }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quize.allowOfflineAttempts}</div>
      </div>
      <QuizeModal quize={quize} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quizes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quize.
      </p>
      <div className="mt-6">
        <QuizeModal emptyState={true} />
      </div>
    </div>
  );
};

