import QuestionBankEntryList from "@/components/questionBankEntries/QuestionBankEntryList";
import NewQuestionBankEntryModal from "@/components/questionBankEntries/QuestionBankEntryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function QuestionBankEntries() {
  await checkAuth();
  const { questionBankEntries } = await api.questionBankEntries.getQuestionBankEntries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Bank Entries</h1>
        <NewQuestionBankEntryModal />
      </div>
      <QuestionBankEntryList questionBankEntries={questionBankEntries} />
    </main>
  );
}
