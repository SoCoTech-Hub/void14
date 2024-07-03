"use client";
import { CompletePaymentAccount } from "@/lib/db/schema/paymentAccounts";
import { trpc } from "@/lib/trpc/client";
import PaymentAccountModal from "./PaymentAccountModal";


export default function PaymentAccountList({ paymentAccounts }: { paymentAccounts: CompletePaymentAccount[] }) {
  const { data: p } = trpc.paymentAccounts.getPaymentAccounts.useQuery(undefined, {
    initialData: { paymentAccounts },
    refetchOnMount: false,
  });

  if (p.paymentAccounts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.paymentAccounts.map((paymentAccount) => (
        <PaymentAccount paymentAccount={paymentAccount} key={paymentAccount.id} />
      ))}
    </ul>
  );
}

const PaymentAccount = ({ paymentAccount }: { paymentAccount: CompletePaymentAccount }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{paymentAccount.archived}</div>
      </div>
      <PaymentAccountModal paymentAccount={paymentAccount} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No payment accounts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new payment account.
      </p>
      <div className="mt-6">
        <PaymentAccountModal emptyState={true} />
      </div>
    </div>
  );
};

