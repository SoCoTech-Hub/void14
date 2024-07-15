"use client";
import { CompleteGlossaryEntriesCategory } from "@soco/glossary-db/schema/glossaryEntriesCategories";
import { trpc } from "@/lib/trpc/client";
import GlossaryEntriesCategoryModal from "./GlossaryEntriesCategoryModal";


export default function GlossaryEntriesCategoryList({ glossaryEntriesCategories }: { glossaryEntriesCategories: CompleteGlossaryEntriesCategory[] }) {
  const { data: g } = trpc.glossaryEntriesCategories.getGlossaryEntriesCategories.useQuery(undefined, {
    initialData: { glossaryEntriesCategories },
    refetchOnMount: false,
  });

  if (g.glossaryEntriesCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.glossaryEntriesCategories.map((glossaryEntriesCategory) => (
        <GlossaryEntriesCategory glossaryEntriesCategory={glossaryEntriesCategory} key={glossaryEntriesCategory.id} />
      ))}
    </ul>
  );
}

const GlossaryEntriesCategory = ({ glossaryEntriesCategory }: { glossaryEntriesCategory: CompleteGlossaryEntriesCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{glossaryEntriesCategory.categoryId}</div>
      </div>
      <GlossaryEntriesCategoryModal glossaryEntriesCategory={glossaryEntriesCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No glossary entries categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new glossary entries category.
      </p>
      <div className="mt-6">
        <GlossaryEntriesCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

