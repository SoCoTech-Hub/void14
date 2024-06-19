import QuestionVersionList from "@/components/questionVersions/QuestionVersionList";
import NewQuestionVersionModal from "@/components/questionVersions/QuestionVersionModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionVersions() {
  const { questionVersions } = await api.questionVersions.getQuestionVersions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Versions</h1>
        <NewQuestionVersionModal />
      </div>
      <QuestionVersionList questionVersions={questionVersions} />
    </main>
  );
}
