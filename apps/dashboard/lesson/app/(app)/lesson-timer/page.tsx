import LessonTimerList from "@/components/lessonTimer/LessonTimerList";
import NewLessonTimerModal from "@/components/lessonTimer/LessonTimerModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function LessonTimer() {
  await checkAuth();
  const { lessonTimer } = await api.lessonTimer.getLessonTimer.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lesson Timer</h1>
        <NewLessonTimerModal />
      </div>
      <LessonTimerList lessonTimer={lessonTimer} />
    </main>
  );
}
