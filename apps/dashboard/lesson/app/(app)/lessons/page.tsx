import LessonList from "@/components/lessons/LessonList";
import NewLessonModal from "@/components/lessons/LessonModal";
import { api } from "@/lib/trpc/api";

export default async function Lessons() {
  const { lessons } = await api.lessons.getLessons.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lessons</h1>
        <NewLessonModal />
      </div>
      <LessonList lessons={lessons} />
    </main>
  );
}
