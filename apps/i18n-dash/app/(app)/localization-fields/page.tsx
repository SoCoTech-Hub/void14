import LocalizationFieldList from "@/components/localizationFields/LocalizationFieldList";
import NewLocalizationFieldModal from "@/components/localizationFields/LocalizationFieldModal";
import { api } from "@/lib/trpc/api";

export default async function LocalizationFields() {
  const { localizationFields } = await api.localizationFields.getLocalizationFields.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Localization Fields</h1>
        <NewLocalizationFieldModal />
      </div>
      <LocalizationFieldList localizationFields={localizationFields} />
    </main>
  );
}
