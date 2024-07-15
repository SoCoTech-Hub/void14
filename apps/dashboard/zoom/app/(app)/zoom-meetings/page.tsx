import ZoomMeetingList from "@/components/zoomMeetings/ZoomMeetingList";
import NewZoomMeetingModal from "@/components/zoomMeetings/ZoomMeetingModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ZoomMeetings() {
  await checkAuth();
  const { zoomMeetings } = await api.zoomMeetings.getZoomMeetings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Zoom Meetings</h1>
        <NewZoomMeetingModal />
      </div>
      <ZoomMeetingList zoomMeetings={zoomMeetings} />
    </main>
  );
}
