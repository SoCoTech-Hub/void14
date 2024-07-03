"use client";
import { CompleteSurveyAnalysiss } from "@/lib/db/schema/surveyAnalysiss";
import { trpc } from "@/lib/trpc/client";
import SurveyAnalysissModal from "./SurveyAnalysissModal";


export default function SurveyAnalysissList({ surveyAnalysiss }: { surveyAnalysiss: CompleteSurveyAnalysiss[] }) {
  const { data: s } = trpc.surveyAnalysiss.getSurveyAnalysiss.useQuery(undefined, {
    initialData: { surveyAnalysiss },
    refetchOnMount: false,
  });

  if (s.surveyAnalysiss.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.surveyAnalysiss.map((surveyAnalysiss) => (
        <SurveyAnalysiss surveyAnalysiss={surveyAnalysiss} key={surveyAnalysiss.surveyAnalysiss.id} />
      ))}
    </ul>
  );
}

const SurveyAnalysiss = ({ surveyAnalysiss }: { surveyAnalysiss: CompleteSurveyAnalysiss }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{surveyAnalysiss.surveyAnalysiss.notes}</div>
      </div>
      <SurveyAnalysissModal surveyAnalysiss={surveyAnalysiss.surveyAnalysiss} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No survey analysiss
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new survey analysiss.
      </p>
      <div className="mt-6">
        <SurveyAnalysissModal emptyState={true} />
      </div>
    </div>
  );
};

