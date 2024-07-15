"use client";
import { CompleteUrl } from "@soco/url-db/schema/urls";
import { trpc } from "@/lib/trpc/client";
import UrlModal from "./UrlModal";


export default function UrlList({ urls }: { urls: CompleteUrl[] }) {
  const { data: u } = trpc.urls.getUrls.useQuery(undefined, {
    initialData: { urls },
    refetchOnMount: false,
  });

  if (u.urls.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.urls.map((url) => (
        <Url url={url} key={url.id} />
      ))}
    </ul>
  );
}

const Url = ({ url }: { url: CompleteUrl }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{url.courseId}</div>
      </div>
      <UrlModal url={url} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No urls
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new url.
      </p>
      <div className="mt-6">
        <UrlModal emptyState={true} />
      </div>
    </div>
  );
};

