"use client";
import { CompleteGlossaryCategory } from "@soco/glossary-db/schema/glossaryCategories";
import { trpc } from "@/lib/trpc/client";
import GlossaryCategoryModal from "./GlossaryCategoryModal";


export default function GlossaryCategoryList({ glossaryCategories }: { glossaryCategories: CompleteGlossaryCategory[] }) {
  const { data: g } = trpc.glossaryCategories.getGlossaryCategories.useQuery(undefined, {
    initialData: { glossaryCategories },
    refetchOnMount: false,
  });

  if (g.glossaryCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.glossaryCategories.map((glossaryCategory) => (
        <GlossaryCategory glossaryCategory={glossaryCategory} key={glossaryCategory.glossaryCategory.id} />
      ))}
    </ul>
  );
}

const GlossaryCategory = ({ glossaryCategory }: { glossaryCategory: CompleteGlossaryCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{glossaryCategory.glossaryCategory.glossaryId}</div>
      </div>
      <GlossaryCategoryModal glossaryCategory={glossaryCategory.glossaryCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No glossary categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new glossary category.
      </p>
      <div className="mt-6">
        <GlossaryCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

