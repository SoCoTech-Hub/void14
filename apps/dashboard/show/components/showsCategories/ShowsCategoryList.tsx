"use client";
import { CompleteShowsCategory } from "@soco/show-db/schema/showsCategories";
import { trpc } from "@/lib/trpc/client";
import ShowsCategoryModal from "./ShowsCategoryModal";


export default function ShowsCategoryList({ showsCategories }: { showsCategories: CompleteShowsCategory[] }) {
  const { data: s } = trpc.showsCategories.getShowsCategories.useQuery(undefined, {
    initialData: { showsCategories },
    refetchOnMount: false,
  });

  if (s.showsCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.showsCategories.map((showsCategory) => (
        <ShowsCategory showsCategory={showsCategory} key={showsCategory.id} />
      ))}
    </ul>
  );
}

const ShowsCategory = ({ showsCategory }: { showsCategory: CompleteShowsCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{showsCategory.name}</div>
      </div>
      <ShowsCategoryModal showsCategory={showsCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No shows categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new shows category.
      </p>
      <div className="mt-6">
        <ShowsCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

