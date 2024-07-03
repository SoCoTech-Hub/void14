import CustomFieldFieldList from "@/components/customFieldFields/CustomFieldFieldList";
import NewCustomFieldFieldModal from "@/components/customFieldFields/CustomFieldFieldModal";
import { api } from "@/lib/trpc/api";

export default async function CustomFieldFields() {
  const { customFieldFields } = await api.customFieldFields.getCustomFieldFields.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Custom Field Fields</h1>
        <NewCustomFieldFieldModal />
      </div>
      <CustomFieldFieldList customFieldFields={customFieldFields} />
    </main>
  );
}
