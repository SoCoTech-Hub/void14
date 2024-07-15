"use client";
import { CompleteLocalizationField } from "@soco/i18n-db/schema/localizationFields";
import { trpc } from "@/lib/trpc/client";
import LocalizationFieldModal from "./LocalizationFieldModal";


export default function LocalizationFieldList({ localizationFields }: { localizationFields: CompleteLocalizationField[] }) {
  const { data: l } = trpc.localizationFields.getLocalizationFields.useQuery(undefined, {
    initialData: { localizationFields },
    refetchOnMount: false,
  });

  if (l.localizationFields.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.localizationFields.map((localizationField) => (
        <LocalizationField localizationField={localizationField} key={localizationField.id} />
      ))}
    </ul>
  );
}

const LocalizationField = ({ localizationField }: { localizationField: CompleteLocalizationField }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{localizationField.name}</div>
      </div>
      <LocalizationFieldModal localizationField={localizationField} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No localization fields
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new localization field.
      </p>
      <div className="mt-6">
        <LocalizationFieldModal emptyState={true} />
      </div>
    </div>
  );
};

