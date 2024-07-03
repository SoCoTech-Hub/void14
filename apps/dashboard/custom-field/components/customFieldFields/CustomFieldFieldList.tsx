"use client";
import { CompleteCustomFieldField } from "@/lib/db/schema/customFieldFields";
import { trpc } from "@/lib/trpc/client";
import CustomFieldFieldModal from "./CustomFieldFieldModal";


export default function CustomFieldFieldList({ customFieldFields }: { customFieldFields: CompleteCustomFieldField[] }) {
  const { data: c } = trpc.customFieldFields.getCustomFieldFields.useQuery(undefined, {
    initialData: { customFieldFields },
    refetchOnMount: false,
  });

  if (c.customFieldFields.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.customFieldFields.map((customFieldField) => (
        <CustomFieldField customFieldField={customFieldField} key={customFieldField.customFieldField.id} />
      ))}
    </ul>
  );
}

const CustomFieldField = ({ customFieldField }: { customFieldField: CompleteCustomFieldField }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{customFieldField.customFieldField.customFieldCategoryId}</div>
      </div>
      <CustomFieldFieldModal customFieldField={customFieldField.customFieldField} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No custom field fields
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new custom field field.
      </p>
      <div className="mt-6">
        <CustomFieldFieldModal emptyState={true} />
      </div>
    </div>
  );
};

