"use client";
import { CompleteNextOfKin } from "@/lib/db/schema/nextOfKins";
import { trpc } from "@/lib/trpc/client";
import NextOfKinModal from "./NextOfKinModal";


export default function NextOfKinList({ nextOfKins }: { nextOfKins: CompleteNextOfKin[] }) {
  const { data: n } = trpc.nextOfKins.getNextOfKins.useQuery(undefined, {
    initialData: { nextOfKins },
    refetchOnMount: false,
  });

  if (n.nextOfKins.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {n.nextOfKins.map((nextOfKin) => (
        <NextOfKin nextOfKin={nextOfKin} key={nextOfKin.id} />
      ))}
    </ul>
  );
}

const NextOfKin = ({ nextOfKin }: { nextOfKin: CompleteNextOfKin }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{nextOfKin.name}</div>
      </div>
      <NextOfKinModal nextOfKin={nextOfKin} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No next of kins
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new next of kin.
      </p>
      <div className="mt-6">
        <NextOfKinModal emptyState={true} />
      </div>
    </div>
  );
};

