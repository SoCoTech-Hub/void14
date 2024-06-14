import GradingformGuideFillingList from "@/components/gradingformGuideFillings/GradingformGuideFillingList";
import NewGradingformGuideFillingModal from "@/components/gradingformGuideFillings/GradingformGuideFillingModal";
import { api } from "@/lib/trpc/api";

export default async function GradingformGuideFillings() {
  const { gradingformGuideFillings } = await api.gradingformGuideFillings.getGradingformGuideFillings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Gradingform Guide Fillings</h1>
        <NewGradingformGuideFillingModal />
      </div>
      <GradingformGuideFillingList gradingformGuideFillings={gradingformGuideFillings} />
    </main>
  );
}
