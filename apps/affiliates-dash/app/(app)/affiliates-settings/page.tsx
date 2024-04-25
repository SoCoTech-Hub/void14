import AffiliatesSettingList from "@/components/affiliatesSettings/AffiliatesSettingList";
import NewAffiliatesSettingModal from "@/components/affiliatesSettings/AffiliatesSettingModal";
import { api } from "@/lib/trpc/api";

export default async function AffiliatesSettings() {
  const { affiliatesSettings } = await api.affiliatesSettings.getAffiliatesSettings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Affiliates Settings</h1>
        <NewAffiliatesSettingModal />
      </div>
      <AffiliatesSettingList affiliatesSettings={affiliatesSettings} />
    </main>
  );
}
