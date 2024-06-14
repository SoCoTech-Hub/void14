import ForumGradeList from "@/components/forumGrades/ForumGradeList";
import NewForumGradeModal from "@/components/forumGrades/ForumGradeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ForumGrades() {
  await checkAuth();
  const { forumGrades } = await api.forumGrades.getForumGrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Grades</h1>
        <NewForumGradeModal />
      </div>
      <ForumGradeList forumGrades={forumGrades} />
    </main>
  );
}
