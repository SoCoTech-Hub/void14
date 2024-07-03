import ChoiceAnswerList from "@/components/choiceAnswers/ChoiceAnswerList";
import NewChoiceAnswerModal from "@/components/choiceAnswers/ChoiceAnswerModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ChoiceAnswers() {
  await checkAuth();
  const { choiceAnswers } = await api.choiceAnswers.getChoiceAnswers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Choice Answers</h1>
        <NewChoiceAnswerModal />
      </div>
      <ChoiceAnswerList choiceAnswers={choiceAnswers} />
    </main>
  );
}
