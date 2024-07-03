"use client";
import { CompleteQuizSlot } from "@/lib/db/schema/quizSlots";
import { trpc } from "@/lib/trpc/client";
import QuizSlotModal from "./QuizSlotModal";


export default function QuizSlotList({ quizSlots }: { quizSlots: CompleteQuizSlot[] }) {
  const { data: q } = trpc.quizSlots.getQuizSlots.useQuery(undefined, {
    initialData: { quizSlots },
    refetchOnMount: false,
  });

  if (q.quizSlots.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizSlots.map((quizSlot) => (
        <QuizSlot quizSlot={quizSlot} key={quizSlot.quizSlot.id} />
      ))}
    </ul>
  );
}

const QuizSlot = ({ quizSlot }: { quizSlot: CompleteQuizSlot }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizSlot.quizSlot.maxMark}</div>
      </div>
      <QuizSlotModal quizSlot={quizSlot.quizSlot} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz slots
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz slot.
      </p>
      <div className="mt-6">
        <QuizSlotModal emptyState={true} />
      </div>
    </div>
  );
};

