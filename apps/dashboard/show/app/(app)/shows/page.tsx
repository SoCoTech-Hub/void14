import ShowList from "@/components/shows/ShowList";
import NewShowModal from "@/components/shows/ShowModal";
import { api } from "@/lib/trpc/api";

export default async function Shows() {
  const { shows } = await api.shows.getShows.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Shows</h1>
        <NewShowModal />
      </div>
      <ShowList shows={shows} />
    </main>
  );
}
