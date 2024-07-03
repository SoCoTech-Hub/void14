import SurveyAnswerList from "@/components/surveyAnswers/SurveyAnswerList";
import NewSurveyAnswerModal from "@/components/surveyAnswers/SurveyAnswerModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function SurveyAnswers() {
  await checkAuth();
  const { surveyAnswers } = await api.surveyAnswers.getSurveyAnswers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Survey Answers</h1>
        <NewSurveyAnswerModal />
      </div>
      <SurveyAnswerList surveyAnswers={surveyAnswers} />
    </main>
  );
}
