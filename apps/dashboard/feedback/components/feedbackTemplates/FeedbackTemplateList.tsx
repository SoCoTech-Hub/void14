"use client";
import { CompleteFeedbackTemplate } from "@/lib/db/schema/feedbackTemplates";
import { trpc } from "@/lib/trpc/client";
import FeedbackTemplateModal from "./FeedbackTemplateModal";


export default function FeedbackTemplateList({ feedbackTemplates }: { feedbackTemplates: CompleteFeedbackTemplate[] }) {
  const { data: f } = trpc.feedbackTemplates.getFeedbackTemplates.useQuery(undefined, {
    initialData: { feedbackTemplates },
    refetchOnMount: false,
  });

  if (f.feedbackTemplates.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feedbackTemplates.map((feedbackTemplate) => (
        <FeedbackTemplate feedbackTemplate={feedbackTemplate} key={feedbackTemplate.id} />
      ))}
    </ul>
  );
}

const FeedbackTemplate = ({ feedbackTemplate }: { feedbackTemplate: CompleteFeedbackTemplate }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{feedbackTemplate.course}</div>
      </div>
      <FeedbackTemplateModal feedbackTemplate={feedbackTemplate} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No feedback templates
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new feedback template.
      </p>
      <div className="mt-6">
        <FeedbackTemplateModal emptyState={true} />
      </div>
    </div>
  );
};

