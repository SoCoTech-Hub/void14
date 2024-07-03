"use client";
import { CompleteBursaryCategoriesBursary } from "@/lib/db/schema/bursaryCategoriesBursaries";
import { trpc } from "@/lib/trpc/client";
import BursaryCategoriesBursaryModal from "./BursaryCategoriesBursaryModal";


export default function BursaryCategoriesBursaryList({ bursaryCategoriesBursaries }: { bursaryCategoriesBursaries: CompleteBursaryCategoriesBursary[] }) {
  const { data: b } = trpc.bursaryCategoriesBursaries.getBursaryCategoriesBursaries.useQuery(undefined, {
    initialData: { bursaryCategoriesBursaries },
    refetchOnMount: false,
  });

  if (b.bursaryCategoriesBursaries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bursaryCategoriesBursaries.map((bursaryCategoriesBursary) => (
        <BursaryCategoriesBursary bursaryCategoriesBursary={bursaryCategoriesBursary} key={bursaryCategoriesBursary.bursaryCategoriesBursary.id} />
      ))}
    </ul>
  );
}

const BursaryCategoriesBursary = ({ bursaryCategoriesBursary }: { bursaryCategoriesBursary: CompleteBursaryCategoriesBursary }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bursaryCategoriesBursary.bursaryCategoriesBursary.bursaryId}</div>
      </div>
      <BursaryCategoriesBursaryModal bursaryCategoriesBursary={bursaryCategoriesBursary.bursaryCategoriesBursary} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No bursary categories bursaries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new bursary categories bursary.
      </p>
      <div className="mt-6">
        <BursaryCategoriesBursaryModal emptyState={true} />
      </div>
    </div>
  );
};

