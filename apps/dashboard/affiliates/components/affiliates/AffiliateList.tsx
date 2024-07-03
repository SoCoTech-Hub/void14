"use client";
import { CompleteAffiliate } from "@/lib/db/schema/affiliates";
import { trpc } from "@/lib/trpc/client";
import AffiliateModal from "./AffiliateModal";


export default function AffiliateList({ affiliates }: { affiliates: CompleteAffiliate[] }) {
  const { data: a } = trpc.affiliates.getAffiliates.useQuery(undefined, {
    initialData: { affiliates },
    refetchOnMount: false,
  });

  if (a.affiliates.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.affiliates.map((affiliate) => (
        <Affiliate affiliate={affiliate} key={affiliate.id} />
      ))}
    </ul>
  );
}

const Affiliate = ({ affiliate }: { affiliate: CompleteAffiliate }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{affiliate.isApproved}</div>
        <div>{affiliate.note}</div>
      </div>
      <AffiliateModal affiliate={affiliate} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No affiliates
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new affiliate.
      </p>
      <div className="mt-6">
        <AffiliateModal emptyState={true} />
      </div>
    </div>
  );
};

