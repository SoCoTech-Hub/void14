import LocalizationLanguageList from "@/components/localizationLanguages/LocalizationLanguageList";
import NewLocalizationLanguageModal from "@/components/localizationLanguages/LocalizationLanguageModal";
import { api } from "@/lib/trpc/api";

export default async function LocalizationLanguages() {
  const { localizationLanguages } = await api.localizationLanguages.getLocalizationLanguages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Localization Languages</h1>
        <NewLocalizationLanguageModal />
      </div>
      <LocalizationLanguageList localizationLanguages={localizationLanguages} />
    </main>
  );
}
