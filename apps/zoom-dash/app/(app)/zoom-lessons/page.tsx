import ZoomLessonList from "@/components/zoomLessons/ZoomLessonList";
import NewZoomLessonModal from "@/components/zoomLessons/ZoomLessonModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ZoomLessons() {
  await checkAuth();
  const { zoomLessons } = await api.zoomLessons.getZoomLessons.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Zoom Lessons</h1>
        <NewZoomLessonModal />
      </div>
      <ZoomLessonList zoomLessons={zoomLessons} />
    </main>
  );
}
