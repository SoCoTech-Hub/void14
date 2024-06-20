import PaymentAccountList from "@/components/paymentAccounts/PaymentAccountList";
import NewPaymentAccountModal from "@/components/paymentAccounts/PaymentAccountModal";
import { api } from "@/lib/trpc/api";

export default async function PaymentAccounts() {
  const { paymentAccounts } = await api.paymentAccounts.getPaymentAccounts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Payment Accounts</h1>
        <NewPaymentAccountModal />
      </div>
      <PaymentAccountList paymentAccounts={paymentAccounts} />
    </main>
  );
}
