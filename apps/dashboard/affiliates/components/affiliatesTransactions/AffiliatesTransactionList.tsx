"use client";
import { CompleteAffiliatesTransaction } from "@soco/affiliates-db/schema/affiliatesTransactions";
import { trpc } from "@/lib/trpc/client";
import AffiliatesTransactionModal from "./AffiliatesTransactionModal";


export default function AffiliatesTransactionList({ affiliatesTransactions }: { affiliatesTransactions: CompleteAffiliatesTransaction[] }) {
  const { data: a } = trpc.affiliatesTransactions.getAffiliatesTransactions.useQuery(undefined, {
    initialData: { affiliatesTransactions },
    refetchOnMount: false,
  });

  if (a.affiliatesTransactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.affiliatesTransactions.map((affiliatesTransaction) => (
        <AffiliatesTransaction affiliatesTransaction={affiliatesTransaction} key={affiliatesTransaction.affiliatesTransaction.id} />
      ))}
    </ul>
  );
}

const AffiliatesTransaction = ({ affiliatesTransaction }: { affiliatesTransaction: CompleteAffiliatesTransaction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{affiliatesTransaction.affiliatesTransaction.paid}</div>
      </div>
      <AffiliatesTransactionModal affiliatesTransaction={affiliatesTransaction.affiliatesTransaction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No affiliates transactions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new affiliates transaction.
      </p>
      <div className="mt-6">
        <AffiliatesTransactionModal emptyState={true} />
      </div>
    </div>
  );
};

