import LocalizationTranslationList from "@/components/localizationTranslations/LocalizationTranslationList";
import NewLocalizationTranslationModal from "@/components/localizationTranslations/LocalizationTranslationModal";
import { api } from "@/lib/trpc/api";

export default async function LocalizationTranslations() {
  const { localizationTranslations } = await api.localizationTranslations.getLocalizationTranslations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Localization Translations</h1>
        <NewLocalizationTranslationModal />
      </div>
      <LocalizationTranslationList localizationTranslations={localizationTranslations} />
    </main>
  );
}
