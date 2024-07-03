import QuizeList from "@/components/quizes/QuizeList";
import NewQuizeModal from "@/components/quizes/QuizeModal";
import { api } from "@/lib/trpc/api";

export default async function Quizes() {
  const { quizes } = await api.quizes.getQuizes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quizes</h1>
        <NewQuizeModal />
      </div>
      <QuizeList quizes={quizes} />
    </main>
  );
}
