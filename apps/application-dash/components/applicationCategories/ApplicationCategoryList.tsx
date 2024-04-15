"use client";
import { CompleteApplicationCategory } from "@/lib/db/schema/applicationCategories";
import { trpc } from "@/lib/trpc/client";
import ApplicationCategoryModal from "./ApplicationCategoryModal";


export default function ApplicationCategoryList({ applicationCategories }: { applicationCategories: CompleteApplicationCategory[] }) {
  const { data: a } = trpc.applicationCategories.getApplicationCategories.useQuery(undefined, {
    initialData: { applicationCategories },
    refetchOnMount: false,
  });

  if (a.applicationCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.applicationCategories.map((applicationCategory) => (
        <ApplicationCategory applicationCategory={applicationCategory} key={applicationCategory.id} />
      ))}
    </ul>
  );
}

const ApplicationCategory = ({ applicationCategory }: { applicationCategory: CompleteApplicationCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{applicationCategory.name}</div>
      </div>
      <ApplicationCategoryModal applicationCategory={applicationCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No application categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new application category.
      </p>
      <div className="mt-6">
        <ApplicationCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

