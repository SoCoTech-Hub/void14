import SurveyList from "@/components/surveys/SurveyList";
import NewSurveyModal from "@/components/surveys/SurveyModal";
import { api } from "@/lib/trpc/api";

export default async function Surveys() {
  const { surveys } = await api.surveys.getSurveys.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Surveys</h1>
        <NewSurveyModal />
      </div>
      <SurveyList surveys={surveys} />
    </main>
  );
}
