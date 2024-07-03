"use client";
import { CompleteQuestionCategory } from "@/lib/db/schema/questionCategories";
import { trpc } from "@/lib/trpc/client";
import QuestionCategoryModal from "./QuestionCategoryModal";


export default function QuestionCategoryList({ questionCategories }: { questionCategories: CompleteQuestionCategory[] }) {
  const { data: q } = trpc.questionCategories.getQuestionCategories.useQuery(undefined, {
    initialData: { questionCategories },
    refetchOnMount: false,
  });

  if (q.questionCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionCategories.map((questionCategory) => (
        <QuestionCategory questionCategory={questionCategory} key={questionCategory.id} />
      ))}
    </ul>
  );
}

const QuestionCategory = ({ questionCategory }: { questionCategory: CompleteQuestionCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionCategory.contextId}</div>
      </div>
      <QuestionCategoryModal questionCategory={questionCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question category.
      </p>
      <div className="mt-6">
        <QuestionCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

