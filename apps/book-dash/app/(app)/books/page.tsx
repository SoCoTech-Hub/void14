import BookList from "@/components/books/BookList";
import NewBookModal from "@/components/books/BookModal";
import { api } from "@/lib/trpc/api";

export default async function Books() {
  const { books } = await api.books.getBooks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Books</h1>
        <NewBookModal />
      </div>
      <BookList books={books} />
    </main>
  );
}
