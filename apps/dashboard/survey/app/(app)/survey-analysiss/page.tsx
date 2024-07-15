import SurveyAnalysissList from "@/components/surveyAnalysiss/SurveyAnalysissList";
import NewSurveyAnalysissModal from "@/components/surveyAnalysiss/SurveyAnalysissModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function SurveyAnalysiss() {
  await checkAuth();
  const { surveyAnalysiss } = await api.surveyAnalysiss.getSurveyAnalysiss.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Survey Analysiss</h1>
        <NewSurveyAnalysissModal />
      </div>
      <SurveyAnalysissList surveyAnalysiss={surveyAnalysiss} />
    </main>
  );
}
