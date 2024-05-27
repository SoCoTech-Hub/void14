import CustomFieldDataList from "@/components/customFieldDatas/CustomFieldDataList";
import NewCustomFieldDataModal from "@/components/customFieldDatas/CustomFieldDataModal";
import { api } from "@/lib/trpc/api";

export default async function CustomFieldDatas() {
  const { customFieldDatas } = await api.customFieldDatas.getCustomFieldDatas.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Custom Field Datas</h1>
        <NewCustomFieldDataModal />
      </div>
      <CustomFieldDataList customFieldDatas={customFieldDatas} />
    </main>
  );
}
