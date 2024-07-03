"use client";
import { CompleteBlogExternal } from "@/lib/db/schema/blogExternals";
import { trpc } from "@/lib/trpc/client";
import BlogExternalModal from "./BlogExternalModal";


export default function BlogExternalList({ blogExternals }: { blogExternals: CompleteBlogExternal[] }) {
  const { data: b } = trpc.blogExternals.getBlogExternals.useQuery(undefined, {
    initialData: { blogExternals },
    refetchOnMount: false,
  });

  if (b.blogExternals.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blogExternals.map((blogExternal) => (
        <BlogExternal blogExternal={blogExternal} key={blogExternal.id} />
      ))}
    </ul>
  );
}

const BlogExternal = ({ blogExternal }: { blogExternal: CompleteBlogExternal }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blogExternal.description}</div>
      </div>
      <BlogExternalModal blogExternal={blogExternal} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No blog externals
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new blog external.
      </p>
      <div className="mt-6">
        <BlogExternalModal emptyState={true} />
      </div>
    </div>
  );
};

