import PaymentGatewayList from "@/components/paymentGateways/PaymentGatewayList";
import NewPaymentGatewayModal from "@/components/paymentGateways/PaymentGatewayModal";
import { api } from "@/lib/trpc/api";

export default async function PaymentGateways() {
  const { paymentGateways } = await api.paymentGateways.getPaymentGateways.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Payment Gateways</h1>
        <NewPaymentGatewayModal />
      </div>
      <PaymentGatewayList paymentGateways={paymentGateways} />
    </main>
  );
}
