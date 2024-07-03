import LessonBranchList from "@/components/lessonBranches/LessonBranchList";
import NewLessonBranchModal from "@/components/lessonBranches/LessonBranchModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function LessonBranches() {
  await checkAuth();
  const { lessonBranches } = await api.lessonBranches.getLessonBranches.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lesson Branches</h1>
        <NewLessonBranchModal />
      </div>
      <LessonBranchList lessonBranches={lessonBranches} />
    </main>
  );
}
