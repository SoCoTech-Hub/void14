import BigBlueButtonBnRecordingList from "@/components/bigBlueButtonBnRecordings/BigBlueButtonBnRecordingList";
import NewBigBlueButtonBnRecordingModal from "@/components/bigBlueButtonBnRecordings/BigBlueButtonBnRecordingModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function BigBlueButtonBnRecordings() {
  await checkAuth();
  const { bigBlueButtonBnRecordings } = await api.bigBlueButtonBnRecordings.getBigBlueButtonBnRecordings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Big Blue Button Bn Recordings</h1>
        <NewBigBlueButtonBnRecordingModal />
      </div>
      <BigBlueButtonBnRecordingList bigBlueButtonBnRecordings={bigBlueButtonBnRecordings} />
    </main>
  );
}
