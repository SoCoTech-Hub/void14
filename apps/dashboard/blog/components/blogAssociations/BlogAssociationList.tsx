"use client";
import { CompleteBlogAssociation } from "@soco/blog-db/schema/blogAssociations";
import { trpc } from "@/lib/trpc/client";
import BlogAssociationModal from "./BlogAssociationModal";


export default function BlogAssociationList({ blogAssociations }: { blogAssociations: CompleteBlogAssociation[] }) {
  const { data: b } = trpc.blogAssociations.getBlogAssociations.useQuery(undefined, {
    initialData: { blogAssociations },
    refetchOnMount: false,
  });

  if (b.blogAssociations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blogAssociations.map((blogAssociation) => (
        <BlogAssociation blogAssociation={blogAssociation} key={blogAssociation.blogAssociation.id} />
      ))}
    </ul>
  );
}

const BlogAssociation = ({ blogAssociation }: { blogAssociation: CompleteBlogAssociation }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blogAssociation.blogAssociation.blogExternalId}</div>
      </div>
      <BlogAssociationModal blogAssociation={blogAssociation.blogAssociation} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No blog associations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new blog association.
      </p>
      <div className="mt-6">
        <BlogAssociationModal emptyState={true} />
      </div>
    </div>
  );
};

