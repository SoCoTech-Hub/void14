import PaymentList from "@/components/payments/PaymentList";
import NewPaymentModal from "@/components/payments/PaymentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Payments() {
  await checkAuth();
  const { payments } = await api.payments.getPayments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Payments</h1>
        <NewPaymentModal />
      </div>
      <PaymentList payments={payments} />
    </main>
  );
}
