"use client";
import { CompleteSurveyAnswer } from "@soco/survey-db/schema/surveyAnswers";
import { trpc } from "@/lib/trpc/client";
import SurveyAnswerModal from "./SurveyAnswerModal";


export default function SurveyAnswerList({ surveyAnswers }: { surveyAnswers: CompleteSurveyAnswer[] }) {
  const { data: s } = trpc.surveyAnswers.getSurveyAnswers.useQuery(undefined, {
    initialData: { surveyAnswers },
    refetchOnMount: false,
  });

  if (s.surveyAnswers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.surveyAnswers.map((surveyAnswer) => (
        <SurveyAnswer surveyAnswer={surveyAnswer} key={surveyAnswer.surveyAnswer.id} />
      ))}
    </ul>
  );
}

const SurveyAnswer = ({ surveyAnswer }: { surveyAnswer: CompleteSurveyAnswer }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{surveyAnswer.surveyAnswer.answer1}</div>
      </div>
      <SurveyAnswerModal surveyAnswer={surveyAnswer.surveyAnswer} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No survey answers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new survey answer.
      </p>
      <div className="mt-6">
        <SurveyAnswerModal emptyState={true} />
      </div>
    </div>
  );
};

