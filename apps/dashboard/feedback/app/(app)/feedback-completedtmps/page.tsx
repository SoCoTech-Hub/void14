import FeedbackCompletedtmpList from "@/components/feedbackCompletedtmps/FeedbackCompletedtmpList";
import NewFeedbackCompletedtmpModal from "@/components/feedbackCompletedtmps/FeedbackCompletedtmpModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function FeedbackCompletedtmps() {
  await checkAuth();
  const { feedbackCompletedtmps } = await api.feedbackCompletedtmps.getFeedbackCompletedtmps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Feedback Completedtmps</h1>
        <NewFeedbackCompletedtmpModal />
      </div>
      <FeedbackCompletedtmpList feedbackCompletedtmps={feedbackCompletedtmps} />
    </main>
  );
}
