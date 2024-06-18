import LessonAttemptList from "@/components/lessonAttempts/LessonAttemptList";
import NewLessonAttemptModal from "@/components/lessonAttempts/LessonAttemptModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function LessonAttempts() {
  await checkAuth();
  const { lessonAttempts } = await api.lessonAttempts.getLessonAttempts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lesson Attempts</h1>
        <NewLessonAttemptModal />
      </div>
      <LessonAttemptList lessonAttempts={lessonAttempts} />
    </main>
  );
}
