import LessonPageList from "@/components/lessonPages/LessonPageList";
import NewLessonPageModal from "@/components/lessonPages/LessonPageModal";
import { api } from "@/lib/trpc/api";

export default async function LessonPages() {
  const { lessonPages } = await api.lessonPages.getLessonPages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lesson Pages</h1>
        <NewLessonPageModal />
      </div>
      <LessonPageList lessonPages={lessonPages} />
    </main>
  );
}
