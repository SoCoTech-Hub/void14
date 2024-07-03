import PaygwPaypalList from "@/components/paygwPaypals/PaygwPaypalList";
import NewPaygwPaypalModal from "@/components/paygwPaypals/PaygwPaypalModal";
import { api } from "@/lib/trpc/api";

export default async function PaygwPaypals() {
  const { paygwPaypals } = await api.paygwPaypals.getPaygwPaypals.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Paygw Paypals</h1>
        <NewPaygwPaypalModal />
      </div>
      <PaygwPaypalList paygwPaypals={paygwPaypals} />
    </main>
  );
}
