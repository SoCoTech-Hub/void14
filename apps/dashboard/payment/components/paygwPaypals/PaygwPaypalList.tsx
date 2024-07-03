"use client";
import { CompletePaygwPaypal } from "@/lib/db/schema/paygwPaypals";
import { trpc } from "@/lib/trpc/client";
import PaygwPaypalModal from "./PaygwPaypalModal";


export default function PaygwPaypalList({ paygwPaypals }: { paygwPaypals: CompletePaygwPaypal[] }) {
  const { data: p } = trpc.paygwPaypals.getPaygwPaypals.useQuery(undefined, {
    initialData: { paygwPaypals },
    refetchOnMount: false,
  });

  if (p.paygwPaypals.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.paygwPaypals.map((paygwPaypal) => (
        <PaygwPaypal paygwPaypal={paygwPaypal} key={paygwPaypal.paygwPaypal.id} />
      ))}
    </ul>
  );
}

const PaygwPaypal = ({ paygwPaypal }: { paygwPaypal: CompletePaygwPaypal }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{paygwPaypal.paygwPaypal.paymentId}</div>
      </div>
      <PaygwPaypalModal paygwPaypal={paygwPaypal.paygwPaypal} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No paygw paypals
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new paygw paypal.
      </p>
      <div className="mt-6">
        <PaygwPaypalModal emptyState={true} />
      </div>
    </div>
  );
};

