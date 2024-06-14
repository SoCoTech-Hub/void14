"use client";
import { CompleteSurveyQuestion } from "@/lib/db/schema/surveyQuestions";
import { trpc } from "@/lib/trpc/client";
import SurveyQuestionModal from "./SurveyQuestionModal";


export default function SurveyQuestionList({ surveyQuestions }: { surveyQuestions: CompleteSurveyQuestion[] }) {
  const { data: s } = trpc.surveyQuestions.getSurveyQuestions.useQuery(undefined, {
    initialData: { surveyQuestions },
    refetchOnMount: false,
  });

  if (s.surveyQuestions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.surveyQuestions.map((surveyQuestion) => (
        <SurveyQuestion surveyQuestion={surveyQuestion} key={surveyQuestion.id} />
      ))}
    </ul>
  );
}

const SurveyQuestion = ({ surveyQuestion }: { surveyQuestion: CompleteSurveyQuestion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{surveyQuestion.intro}</div>
      </div>
      <SurveyQuestionModal surveyQuestion={surveyQuestion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No survey questions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new survey question.
      </p>
      <div className="mt-6">
        <SurveyQuestionModal emptyState={true} />
      </div>
    </div>
  );
};

