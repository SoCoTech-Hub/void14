import QtypeMatchSubquestionList from "@/components/qtypeMatchSubquestions/QtypeMatchSubquestionList";
import NewQtypeMatchSubquestionModal from "@/components/qtypeMatchSubquestions/QtypeMatchSubquestionModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeMatchSubquestions() {
  const { qtypeMatchSubquestions } = await api.qtypeMatchSubquestions.getQtypeMatchSubquestions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Match Subquestions</h1>
        <NewQtypeMatchSubquestionModal />
      </div>
      <QtypeMatchSubquestionList qtypeMatchSubquestions={qtypeMatchSubquestions} />
    </main>
  );
}
