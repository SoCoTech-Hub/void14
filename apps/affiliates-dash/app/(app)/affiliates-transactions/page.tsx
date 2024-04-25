import AffiliatesTransactionList from "@/components/affiliatesTransactions/AffiliatesTransactionList";
import NewAffiliatesTransactionModal from "@/components/affiliatesTransactions/AffiliatesTransactionModal";
import { api } from "@/lib/trpc/api";

export default async function AffiliatesTransactions() {
  const { affiliatesTransactions } = await api.affiliatesTransactions.getAffiliatesTransactions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Affiliates Transactions</h1>
        <NewAffiliatesTransactionModal />
      </div>
      <AffiliatesTransactionList affiliatesTransactions={affiliatesTransactions} />
    </main>
  );
}
