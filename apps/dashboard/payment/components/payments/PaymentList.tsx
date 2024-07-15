"use client";
import { CompletePayment } from "@soco/payment-db/schema/payments";
import { trpc } from "@/lib/trpc/client";
import PaymentModal from "./PaymentModal";


export default function PaymentList({ payments }: { payments: CompletePayment[] }) {
  const { data: p } = trpc.payments.getPayments.useQuery(undefined, {
    initialData: { payments },
    refetchOnMount: false,
  });

  if (p.payments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.payments.map((payment) => (
        <Payment payment={payment} key={payment.payment.id} />
      ))}
    </ul>
  );
}

const Payment = ({ payment }: { payment: CompletePayment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{payment.payment.paymentAccountId}</div>
      </div>
      <PaymentModal payment={payment.payment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No payments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new payment.
      </p>
      <div className="mt-6">
        <PaymentModal emptyState={true} />
      </div>
    </div>
  );
};

