"use client";
import { CompleteCustomFieldData } from "@soco/custom-field-db/schema/customFieldDatas";
import { trpc } from "@/lib/trpc/client";
import CustomFieldDataModal from "./CustomFieldDataModal";


export default function CustomFieldDataList({ customFieldDatas }: { customFieldDatas: CompleteCustomFieldData[] }) {
  const { data: c } = trpc.customFieldDatas.getCustomFieldDatas.useQuery(undefined, {
    initialData: { customFieldDatas },
    refetchOnMount: false,
  });

  if (c.customFieldDatas.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.customFieldDatas.map((customFieldData) => (
        <CustomFieldData customFieldData={customFieldData} key={customFieldData.id} />
      ))}
    </ul>
  );
}

const CustomFieldData = ({ customFieldData }: { customFieldData: CompleteCustomFieldData }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{customFieldData.charValue}</div>
      </div>
      <CustomFieldDataModal customFieldData={customFieldData} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No custom field datas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new custom field data.
      </p>
      <div className="mt-6">
        <CustomFieldDataModal emptyState={true} />
      </div>
    </div>
  );
};

