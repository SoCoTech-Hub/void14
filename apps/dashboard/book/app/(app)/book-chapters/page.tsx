import BookChapterList from "@/components/bookChapters/BookChapterList";
import NewBookChapterModal from "@/components/bookChapters/BookChapterModal";
import { api } from "@/lib/trpc/api";

export default async function BookChapters() {
  const { bookChapters } = await api.bookChapters.getBookChapters.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Book Chapters</h1>
        <NewBookChapterModal />
      </div>
      <BookChapterList bookChapters={bookChapters} />
    </main>
  );
}
