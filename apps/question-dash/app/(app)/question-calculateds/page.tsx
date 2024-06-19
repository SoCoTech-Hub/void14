import QuestionCalculatedList from "@/components/questionCalculateds/QuestionCalculatedList";
import NewQuestionCalculatedModal from "@/components/questionCalculateds/QuestionCalculatedModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionCalculateds() {
  const { questionCalculateds } = await api.questionCalculateds.getQuestionCalculateds.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Calculateds</h1>
        <NewQuestionCalculatedModal />
      </div>
      <QuestionCalculatedList questionCalculateds={questionCalculateds} />
    </main>
  );
}
