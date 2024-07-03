"use client";
import { CompleteField } from "@/lib/db/schema/fields";
import { trpc } from "@/lib/trpc/client";
import FieldModal from "./FieldModal";


export default function FieldList({ fields }: { fields: CompleteField[] }) {
  const { data: f } = trpc.fields.getFields.useQuery(undefined, {
    initialData: { fields },
    refetchOnMount: false,
  });

  if (f.fields.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.fields.map((field) => (
        <Field field={field} key={field.field.id} />
      ))}
    </ul>
  );
}

const Field = ({ field }: { field: CompleteField }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{field.field.dataId}</div>
      </div>
      <FieldModal field={field.field} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No fields
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new field.
      </p>
      <div className="mt-6">
        <FieldModal emptyState={true} />
      </div>
    </div>
  );
};

