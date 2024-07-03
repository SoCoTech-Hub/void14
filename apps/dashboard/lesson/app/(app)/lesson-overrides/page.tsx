import LessonOverrideList from "@/components/lessonOverrides/LessonOverrideList";
import NewLessonOverrideModal from "@/components/lessonOverrides/LessonOverrideModal";
import { api } from "@/lib/trpc/api";

export default async function LessonOverrides() {
  const { lessonOverrides } = await api.lessonOverrides.getLessonOverrides.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lesson Overrides</h1>
        <NewLessonOverrideModal />
      </div>
      <LessonOverrideList lessonOverrides={lessonOverrides} />
    </main>
  );
}
