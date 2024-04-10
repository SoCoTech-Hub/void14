"use client";
import { CompleteDigilibCategory } from "@/lib/db/schema/digilibCategories";
import { trpc } from "@/lib/trpc/client";
import DigilibCategoryModal from "./DigilibCategoryModal";


export default function DigilibCategoryList({ digilibCategories }: { digilibCategories: CompleteDigilibCategory[] }) {
  const { data: d } = trpc.digilibCategories.getDigilibCategories.useQuery(undefined, {
    initialData: { digilibCategories },
    refetchOnMount: false,
  });

  if (d.digilibCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.digilibCategories.map((digilibCategory) => (
        <DigilibCategory digilibCategory={digilibCategory} key={digilibCategory.id} />
      ))}
    </ul>
  );
}

const DigilibCategory = ({ digilibCategory }: { digilibCategory: CompleteDigilibCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{digilibCategory.name}</div>
      </div>
      <DigilibCategoryModal digilibCategory={digilibCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No digilib categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new digilib category.
      </p>
      <div className="mt-6">
        <DigilibCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

