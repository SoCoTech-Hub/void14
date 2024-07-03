"use client";
import { CompleteFaqFaqsCategory } from "@/lib/db/schema/faqFaqsCategories";
import { trpc } from "@/lib/trpc/client";
import FaqFaqsCategoryModal from "./FaqFaqsCategoryModal";


export default function FaqFaqsCategoryList({ faqFaqsCategories }: { faqFaqsCategories: CompleteFaqFaqsCategory[] }) {
  const { data: f } = trpc.faqFaqsCategories.getFaqFaqsCategories.useQuery(undefined, {
    initialData: { faqFaqsCategories },
    refetchOnMount: false,
  });

  if (f.faqFaqsCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.faqFaqsCategories.map((faqFaqsCategory) => (
        <FaqFaqsCategory faqFaqsCategory={faqFaqsCategory} key={faqFaqsCategory.faqFaqsCategory.id} />
      ))}
    </ul>
  );
}

const FaqFaqsCategory = ({ faqFaqsCategory }: { faqFaqsCategory: CompleteFaqFaqsCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{faqFaqsCategory.faqFaqsCategory.faqCategoryId}</div>
      </div>
      <FaqFaqsCategoryModal faqFaqsCategory={faqFaqsCategory.faqFaqsCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No faq faqs categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new faq faqs category.
      </p>
      <div className="mt-6">
        <FaqFaqsCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

