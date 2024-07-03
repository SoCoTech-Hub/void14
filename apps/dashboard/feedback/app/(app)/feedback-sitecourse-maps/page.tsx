import FeedbackSitecourseMapList from "@/components/feedbackSitecourseMaps/FeedbackSitecourseMapList";
import NewFeedbackSitecourseMapModal from "@/components/feedbackSitecourseMaps/FeedbackSitecourseMapModal";
import { api } from "@/lib/trpc/api";

export default async function FeedbackSitecourseMaps() {
  const { feedbackSitecourseMaps } = await api.feedbackSitecourseMaps.getFeedbackSitecourseMaps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Feedback Sitecourse Maps</h1>
        <NewFeedbackSitecourseMapModal />
      </div>
      <FeedbackSitecourseMapList feedbackSitecourseMaps={feedbackSitecourseMaps} />
    </main>
  );
}
