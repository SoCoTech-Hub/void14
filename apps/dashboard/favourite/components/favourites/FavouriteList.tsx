"use client";
import { CompleteFavourite } from "@/lib/db/schema/favourites";
import { trpc } from "@/lib/trpc/client";
import FavouriteModal from "./FavouriteModal";


export default function FavouriteList({ favourites }: { favourites: CompleteFavourite[] }) {
  const { data: f } = trpc.favourites.getFavourites.useQuery(undefined, {
    initialData: { favourites },
    refetchOnMount: false,
  });

  if (f.favourites.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.favourites.map((favourite) => (
        <Favourite favourite={favourite} key={favourite.id} />
      ))}
    </ul>
  );
}

const Favourite = ({ favourite }: { favourite: CompleteFavourite }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{favourite.component}</div>
      </div>
      <FavouriteModal favourite={favourite} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No favourites
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new favourite.
      </p>
      <div className="mt-6">
        <FavouriteModal emptyState={true} />
      </div>
    </div>
  );
};

