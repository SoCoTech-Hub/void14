"use client";
import { CompleteFeedbackSitecourseMap } from "@/lib/db/schema/feedbackSitecourseMaps";
import { trpc } from "@/lib/trpc/client";
import FeedbackSitecourseMapModal from "./FeedbackSitecourseMapModal";


export default function FeedbackSitecourseMapList({ feedbackSitecourseMaps }: { feedbackSitecourseMaps: CompleteFeedbackSitecourseMap[] }) {
  const { data: f } = trpc.feedbackSitecourseMaps.getFeedbackSitecourseMaps.useQuery(undefined, {
    initialData: { feedbackSitecourseMaps },
    refetchOnMount: false,
  });

  if (f.feedbackSitecourseMaps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feedbackSitecourseMaps.map((feedbackSitecourseMap) => (
        <FeedbackSitecourseMap feedbackSitecourseMap={feedbackSitecourseMap} key={feedbackSitecourseMap.feedbackSitecourseMap.id} />
      ))}
    </ul>
  );
}

const FeedbackSitecourseMap = ({ feedbackSitecourseMap }: { feedbackSitecourseMap: CompleteFeedbackSitecourseMap }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{feedbackSitecourseMap.feedbackSitecourseMap.courseId}</div>
      </div>
      <FeedbackSitecourseMapModal feedbackSitecourseMap={feedbackSitecourseMap.feedbackSitecourseMap} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No feedback sitecourse maps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new feedback sitecourse map.
      </p>
      <div className="mt-6">
        <FeedbackSitecourseMapModal emptyState={true} />
      </div>
    </div>
  );
};

