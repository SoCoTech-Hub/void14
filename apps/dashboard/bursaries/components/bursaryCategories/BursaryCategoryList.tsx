"use client";
import { CompleteBursaryCategory } from "@soco/bursaries-db/schema/bursaryCategories";
import { trpc } from "@/lib/trpc/client";
import BursaryCategoryModal from "./BursaryCategoryModal";


export default function BursaryCategoryList({ bursaryCategories }: { bursaryCategories: CompleteBursaryCategory[] }) {
  const { data: b } = trpc.bursaryCategories.getBursaryCategories.useQuery(undefined, {
    initialData: { bursaryCategories },
    refetchOnMount: false,
  });

  if (b.bursaryCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bursaryCategories.map((bursaryCategory) => (
        <BursaryCategory bursaryCategory={bursaryCategory} key={bursaryCategory.id} />
      ))}
    </ul>
  );
}

const BursaryCategory = ({ bursaryCategory }: { bursaryCategory: CompleteBursaryCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bursaryCategory.name}</div>
      </div>
      <BursaryCategoryModal bursaryCategory={bursaryCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No bursary categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new bursary category.
      </p>
      <div className="mt-6">
        <BursaryCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

