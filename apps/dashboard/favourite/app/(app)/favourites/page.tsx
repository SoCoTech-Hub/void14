import FavouriteList from "@/components/favourites/FavouriteList";
import NewFavouriteModal from "@/components/favourites/FavouriteModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Favourites() {
  await checkAuth();
  const { favourites } = await api.favourites.getFavourites.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Favourites</h1>
        <NewFavouriteModal />
      </div>
      <FavouriteList favourites={favourites} />
    </main>
  );
}
