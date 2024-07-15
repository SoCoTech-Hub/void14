"use client";
import { CompleteBlog } from "@soco/blog-db/schema/blogs";
import { trpc } from "@/lib/trpc/client";
import BlogModal from "./BlogModal";


export default function BlogList({ blogs }: { blogs: CompleteBlog[] }) {
  const { data: b } = trpc.blogs.getBlogs.useQuery(undefined, {
    initialData: { blogs },
    refetchOnMount: false,
  });

  if (b.blogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blogs.map((blog) => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </ul>
  );
}

const Blog = ({ blog }: { blog: CompleteBlog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blog.name}</div>
      </div>
      <BlogModal blog={blog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No blogs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new blog.
      </p>
      <div className="mt-6">
        <BlogModal emptyState={true} />
      </div>
    </div>
  );
};

