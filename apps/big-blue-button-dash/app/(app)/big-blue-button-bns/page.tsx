import BigBlueButtonBnList from "@/components/bigBlueButtonBns/BigBlueButtonBnList";
import NewBigBlueButtonBnModal from "@/components/bigBlueButtonBns/BigBlueButtonBnModal";
import { api } from "@/lib/trpc/api";

export default async function BigBlueButtonBns() {
  const { bigBlueButtonBns } = await api.bigBlueButtonBns.getBigBlueButtonBns.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Big Blue Button Bns</h1>
        <NewBigBlueButtonBnModal />
      </div>
      <BigBlueButtonBnList bigBlueButtonBns={bigBlueButtonBns} />
    </main>
  );
}
