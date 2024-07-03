"use client";
import { CompleteSurvey } from "@/lib/db/schema/surveys";
import { trpc } from "@/lib/trpc/client";
import SurveyModal from "./SurveyModal";


export default function SurveyList({ surveys }: { surveys: CompleteSurvey[] }) {
  const { data: s } = trpc.surveys.getSurveys.useQuery(undefined, {
    initialData: { surveys },
    refetchOnMount: false,
  });

  if (s.surveys.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.surveys.map((survey) => (
        <Survey survey={survey} key={survey.id} />
      ))}
    </ul>
  );
}

const Survey = ({ survey }: { survey: CompleteSurvey }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{survey.name}</div>
      </div>
      <SurveyModal survey={survey} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No surveys
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new survey.
      </p>
      <div className="mt-6">
        <SurveyModal emptyState={true} />
      </div>
    </div>
  );
};

