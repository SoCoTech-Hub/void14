"use client";
import { CompleteBursary } from "@/lib/db/schema/bursaries";
import { trpc } from "@/lib/trpc/client";
import BursaryModal from "./BursaryModal";


export default function BursaryList({ bursaries }: { bursaries: CompleteBursary[] }) {
  const { data: b } = trpc.bursaries.getBursaries.useQuery(undefined, {
    initialData: { bursaries },
    refetchOnMount: false,
  });

  if (b.bursaries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bursaries.map((bursary) => (
        <Bursary bursary={bursary} key={bursary.id} />
      ))}
    </ul>
  );
}

const Bursary = ({ bursary }: { bursary: CompleteBursary }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bursary.name}</div>
      </div>
      <BursaryModal bursary={bursary} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No bursaries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new bursary.
      </p>
      <div className="mt-6">
        <BursaryModal emptyState={true} />
      </div>
    </div>
  );
};

