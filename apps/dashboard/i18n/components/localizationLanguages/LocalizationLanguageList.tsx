"use client";
import { CompleteLocalizationLanguage } from "@soco/i18n-db/schema/localizationLanguages";
import { trpc } from "@/lib/trpc/client";
import LocalizationLanguageModal from "./LocalizationLanguageModal";


export default function LocalizationLanguageList({ localizationLanguages }: { localizationLanguages: CompleteLocalizationLanguage[] }) {
  const { data: l } = trpc.localizationLanguages.getLocalizationLanguages.useQuery(undefined, {
    initialData: { localizationLanguages },
    refetchOnMount: false,
  });

  if (l.localizationLanguages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.localizationLanguages.map((localizationLanguage) => (
        <LocalizationLanguage localizationLanguage={localizationLanguage} key={localizationLanguage.id} />
      ))}
    </ul>
  );
}

const LocalizationLanguage = ({ localizationLanguage }: { localizationLanguage: CompleteLocalizationLanguage }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{localizationLanguage.name}</div>
      </div>
      <LocalizationLanguageModal localizationLanguage={localizationLanguage} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No localization languages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new localization language.
      </p>
      <div className="mt-6">
        <LocalizationLanguageModal emptyState={true} />
      </div>
    </div>
  );
};

