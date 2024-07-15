"use client";
import { CompleteFaqCategory } from "@soco/faq-db/schema/faqCategories";
import { trpc } from "@/lib/trpc/client";
import FaqCategoryModal from "./FaqCategoryModal";


export default function FaqCategoryList({ faqCategories }: { faqCategories: CompleteFaqCategory[] }) {
  const { data: f } = trpc.faqCategories.getFaqCategories.useQuery(undefined, {
    initialData: { faqCategories },
    refetchOnMount: false,
  });

  if (f.faqCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.faqCategories.map((faqCategory) => (
        <FaqCategory faqCategory={faqCategory} key={faqCategory.id} />
      ))}
    </ul>
  );
}

const FaqCategory = ({ faqCategory }: { faqCategory: CompleteFaqCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{faqCategory.name}</div>
      </div>
      <FaqCategoryModal faqCategory={faqCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No faq categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new faq category.
      </p>
      <div className="mt-6">
        <FaqCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

