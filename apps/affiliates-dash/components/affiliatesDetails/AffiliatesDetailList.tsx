"use client";
import { CompleteAffiliatesDetail } from "@/lib/db/schema/affiliatesDetails";
import { trpc } from "@/lib/trpc/client";
import AffiliatesDetailModal from "./AffiliatesDetailModal";


export default function AffiliatesDetailList({ affiliatesDetails }: { affiliatesDetails: CompleteAffiliatesDetail[] }) {
  const { data: a } = trpc.affiliatesDetails.getAffiliatesDetails.useQuery(undefined, {
    initialData: { affiliatesDetails },
    refetchOnMount: false,
  });

  if (a.affiliatesDetails.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.affiliatesDetails.map((affiliatesDetail) => (
        <AffiliatesDetail affiliatesDetail={affiliatesDetail} key={affiliatesDetail.id} />
      ))}
    </ul>
  );
}

const AffiliatesDetail = ({ affiliatesDetail }: { affiliatesDetail: CompleteAffiliatesDetail }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{affiliatesDetail.name}</div>
      </div>
      <AffiliatesDetailModal affiliatesDetail={affiliatesDetail} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No affiliates details
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new affiliates detail.
      </p>
      <div className="mt-6">
        <AffiliatesDetailModal emptyState={true} />
      </div>
    </div>
  );
};

