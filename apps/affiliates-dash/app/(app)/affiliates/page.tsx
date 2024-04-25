import AffiliateList from "@/components/affiliates/AffiliateList";
import NewAffiliateModal from "@/components/affiliates/AffiliateModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Affiliates() {
  await checkAuth();
  const { affiliates } = await api.affiliates.getAffiliates.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Affiliates</h1>
        <NewAffiliateModal />
      </div>
      <AffiliateList affiliates={affiliates} />
    </main>
  );
}
