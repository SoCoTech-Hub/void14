import GradingformRubricFillingList from "@/components/gradingformRubricFillings/GradingformRubricFillingList";
import NewGradingformRubricFillingModal from "@/components/gradingformRubricFillings/GradingformRubricFillingModal";
import { api } from "@/lib/trpc/api";

export default async function GradingformRubricFillings() {
  const { gradingformRubricFillings } = await api.gradingformRubricFillings.getGradingformRubricFillings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Gradingform Rubric Fillings</h1>
        <NewGradingformRubricFillingModal />
      </div>
      <GradingformRubricFillingList gradingformRubricFillings={gradingformRubricFillings} />
    </main>
  );
}
