import QuestionDdwtoList from "@/components/questionDdwtos/QuestionDdwtoList";
import NewQuestionDdwtoModal from "@/components/questionDdwtos/QuestionDdwtoModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionDdwtos() {
  const { questionDdwtos } = await api.questionDdwtos.getQuestionDdwtos.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Ddwtos</h1>
        <NewQuestionDdwtoModal />
      </div>
      <QuestionDdwtoList questionDdwtos={questionDdwtos} />
    </main>
  );
}
