import AffiliatesDetailList from "@/components/affiliatesDetails/AffiliatesDetailList";
import NewAffiliatesDetailModal from "@/components/affiliatesDetails/AffiliatesDetailModal";
import { api } from "@/lib/trpc/api";

export default async function AffiliatesDetails() {
  const { affiliatesDetails } = await api.affiliatesDetails.getAffiliatesDetails.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Affiliates Details</h1>
        <NewAffiliatesDetailModal />
      </div>
      <AffiliatesDetailList affiliatesDetails={affiliatesDetails} />
    </main>
  );
}
