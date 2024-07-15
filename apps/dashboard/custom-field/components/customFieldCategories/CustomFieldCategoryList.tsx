"use client";
import { CompleteCustomFieldCategory } from "@soco/custom-field-db/schema/customFieldCategories";
import { trpc } from "@/lib/trpc/client";
import CustomFieldCategoryModal from "./CustomFieldCategoryModal";


export default function CustomFieldCategoryList({ customFieldCategories }: { customFieldCategories: CompleteCustomFieldCategory[] }) {
  const { data: c } = trpc.customFieldCategories.getCustomFieldCategories.useQuery(undefined, {
    initialData: { customFieldCategories },
    refetchOnMount: false,
  });

  if (c.customFieldCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.customFieldCategories.map((customFieldCategory) => (
        <CustomFieldCategory customFieldCategory={customFieldCategory} key={customFieldCategory.id} />
      ))}
    </ul>
  );
}

const CustomFieldCategory = ({ customFieldCategory }: { customFieldCategory: CompleteCustomFieldCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{customFieldCategory.area}</div>
      </div>
      <CustomFieldCategoryModal customFieldCategory={customFieldCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No custom field categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new custom field category.
      </p>
      <div className="mt-6">
        <CustomFieldCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

