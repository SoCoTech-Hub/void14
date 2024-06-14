import GradingformGuideCommentList from "@/components/gradingformGuideComments/GradingformGuideCommentList";
import NewGradingformGuideCommentModal from "@/components/gradingformGuideComments/GradingformGuideCommentModal";
import { api } from "@/lib/trpc/api";

export default async function GradingformGuideComments() {
  const { gradingformGuideComments } = await api.gradingformGuideComments.getGradingformGuideComments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Gradingform Guide Comments</h1>
        <NewGradingformGuideCommentModal />
      </div>
      <GradingformGuideCommentList gradingformGuideComments={gradingformGuideComments} />
    </main>
  );
}
