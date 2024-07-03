import AffiliatesStatusList from "@/components/affiliatesStatuses/AffiliatesStatusList";
import NewAffiliatesStatusModal from "@/components/affiliatesStatuses/AffiliatesStatusModal";
import { api } from "@/lib/trpc/api";

export default async function AffiliatesStatuses() {
  const { affiliatesStatuses } = await api.affiliatesStatuses.getAffiliatesStatuses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Affiliates Statuses</h1>
        <NewAffiliatesStatusModal />
      </div>
      <AffiliatesStatusList affiliatesStatuses={affiliatesStatuses} />
    </main>
  );
}
