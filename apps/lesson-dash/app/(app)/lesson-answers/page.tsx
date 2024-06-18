import LessonAnswerList from "@/components/lessonAnswers/LessonAnswerList";
import NewLessonAnswerModal from "@/components/lessonAnswers/LessonAnswerModal";
import { api } from "@/lib/trpc/api";

export default async function LessonAnswers() {
  const { lessonAnswers } = await api.lessonAnswers.getLessonAnswers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lesson Answers</h1>
        <NewLessonAnswerModal />
      </div>
      <LessonAnswerList lessonAnswers={lessonAnswers} />
    </main>
  );
}
