import QuizSlotList from "@/components/quizSlots/QuizSlotList";
import NewQuizSlotModal from "@/components/quizSlots/QuizSlotModal";
import { api } from "@/lib/trpc/api";

export default async function QuizSlots() {
  const { quizSlots } = await api.quizSlots.getQuizSlots.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Slots</h1>
        <NewQuizSlotModal />
      </div>
      <QuizSlotList quizSlots={quizSlots} />
    </main>
  );
}
