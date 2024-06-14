import SurveyQuestionList from "@/components/surveyQuestions/SurveyQuestionList";
import NewSurveyQuestionModal from "@/components/surveyQuestions/SurveyQuestionModal";
import { api } from "@/lib/trpc/api";

export default async function SurveyQuestions() {
  const { surveyQuestions } = await api.surveyQuestions.getSurveyQuestions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Survey Questions</h1>
        <NewSurveyQuestionModal />
      </div>
      <SurveyQuestionList surveyQuestions={surveyQuestions} />
    </main>
  );
}
