"use client";
import { CompleteBookChapter } from "@/lib/db/schema/bookChapters";
import { trpc } from "@/lib/trpc/client";
import BookChapterModal from "./BookChapterModal";


export default function BookChapterList({ bookChapters }: { bookChapters: CompleteBookChapter[] }) {
  const { data: b } = trpc.bookChapters.getBookChapters.useQuery(undefined, {
    initialData: { bookChapters },
    refetchOnMount: false,
  });

  if (b.bookChapters.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bookChapters.map((bookChapter) => (
        <BookChapter bookChapter={bookChapter} key={bookChapter.bookChapter.id} />
      ))}
    </ul>
  );
}

const BookChapter = ({ bookChapter }: { bookChapter: CompleteBookChapter }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bookChapter.bookChapter.bookId}</div>
      </div>
      <BookChapterModal bookChapter={bookChapter.bookChapter} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No book chapters
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new book chapter.
      </p>
      <div className="mt-6">
        <BookChapterModal emptyState={true} />
      </div>
    </div>
  );
};

