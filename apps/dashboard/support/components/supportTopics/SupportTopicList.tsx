"use client";
import { CompleteSupportTopic } from "@soco/support-db/schema/supportTopics";
import { trpc } from "@/lib/trpc/client";
import SupportTopicModal from "./SupportTopicModal";


export default function SupportTopicList({ supportTopics }: { supportTopics: CompleteSupportTopic[] }) {
  const { data: s } = trpc.supportTopics.getSupportTopics.useQuery(undefined, {
    initialData: { supportTopics },
    refetchOnMount: false,
  });

  if (s.supportTopics.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.supportTopics.map((supportTopic) => (
        <SupportTopic supportTopic={supportTopic} key={supportTopic.id} />
      ))}
    </ul>
  );
}

const SupportTopic = ({ supportTopic }: { supportTopic: CompleteSupportTopic }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{supportTopic.name}</div>
      </div>
      <SupportTopicModal supportTopic={supportTopic} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No support topics
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new support topic.
      </p>
      <div className="mt-6">
        <SupportTopicModal emptyState={true} />
      </div>
    </div>
  );
};

