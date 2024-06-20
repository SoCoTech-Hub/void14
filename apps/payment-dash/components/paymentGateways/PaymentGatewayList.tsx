"use client";
import { CompletePaymentGateway } from "@/lib/db/schema/paymentGateways";
import { trpc } from "@/lib/trpc/client";
import PaymentGatewayModal from "./PaymentGatewayModal";


export default function PaymentGatewayList({ paymentGateways }: { paymentGateways: CompletePaymentGateway[] }) {
  const { data: p } = trpc.paymentGateways.getPaymentGateways.useQuery(undefined, {
    initialData: { paymentGateways },
    refetchOnMount: false,
  });

  if (p.paymentGateways.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.paymentGateways.map((paymentGateway) => (
        <PaymentGateway paymentGateway={paymentGateway} key={paymentGateway.paymentGateway.id} />
      ))}
    </ul>
  );
}

const PaymentGateway = ({ paymentGateway }: { paymentGateway: CompletePaymentGateway }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{paymentGateway.paymentGateway.paymentAccountId}</div>
      </div>
      <PaymentGatewayModal paymentGateway={paymentGateway.paymentGateway} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No payment gateways
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new payment gateway.
      </p>
      <div className="mt-6">
        <PaymentGatewayModal emptyState={true} />
      </div>
    </div>
  );
};

