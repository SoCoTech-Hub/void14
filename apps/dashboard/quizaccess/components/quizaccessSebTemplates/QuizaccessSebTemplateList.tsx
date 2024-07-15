"use client";
import { CompleteQuizaccessSebTemplate } from "@soco/quizaccess-db/schema/quizaccessSebTemplates";
import { trpc } from "@/lib/trpc/client";
import QuizaccessSebTemplateModal from "./QuizaccessSebTemplateModal";


export default function QuizaccessSebTemplateList({ quizaccessSebTemplates }: { quizaccessSebTemplates: CompleteQuizaccessSebTemplate[] }) {
  const { data: q } = trpc.quizaccessSebTemplates.getQuizaccessSebTemplates.useQuery(undefined, {
    initialData: { quizaccessSebTemplates },
    refetchOnMount: false,
  });

  if (q.quizaccessSebTemplates.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizaccessSebTemplates.map((quizaccessSebTemplate) => (
        <QuizaccessSebTemplate quizaccessSebTemplate={quizaccessSebTemplate} key={quizaccessSebTemplate.id} />
      ))}
    </ul>
  );
}

const QuizaccessSebTemplate = ({ quizaccessSebTemplate }: { quizaccessSebTemplate: CompleteQuizaccessSebTemplate }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizaccessSebTemplate.content}</div>
      </div>
      <QuizaccessSebTemplateModal quizaccessSebTemplate={quizaccessSebTemplate} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quizaccess seb templates
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quizaccess seb template.
      </p>
      <div className="mt-6">
        <QuizaccessSebTemplateModal emptyState={true} />
      </div>
    </div>
  );
};

