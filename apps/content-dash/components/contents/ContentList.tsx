"use client";
import { CompleteContent } from "@/lib/db/schema/contents";
import { trpc } from "@/lib/trpc/client";
import ContentModal from "./ContentModal";


export default function ContentList({ contents }: { contents: CompleteContent[] }) {
  const { data: c } = trpc.contents.getContents.useQuery(undefined, {
    initialData: { contents },
    refetchOnMount: false,
  });

  if (c.contents.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.contents.map((content) => (
        <Content content={content} key={content.id} />
      ))}
    </ul>
  );
}

const Content = ({ content }: { content: CompleteContent }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{content.visibility}</div>
      </div>
      <ContentModal content={content} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No contents
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new content.
      </p>
      <div className="mt-6">
        <ContentModal emptyState={true} />
      </div>
    </div>
  );
};

