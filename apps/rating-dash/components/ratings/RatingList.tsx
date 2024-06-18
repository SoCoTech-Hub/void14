"use client";
import { CompleteRating } from "@/lib/db/schema/ratings";
import { trpc } from "@/lib/trpc/client";
import RatingModal from "./RatingModal";


export default function RatingList({ ratings }: { ratings: CompleteRating[] }) {
  const { data: r } = trpc.ratings.getRatings.useQuery(undefined, {
    initialData: { ratings },
    refetchOnMount: false,
  });

  if (r.ratings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.ratings.map((rating) => (
        <Rating rating={rating} key={rating.id} />
      ))}
    </ul>
  );
}

const Rating = ({ rating }: { rating: CompleteRating }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{rating.component}</div>
      </div>
      <RatingModal rating={rating} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No ratings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new rating.
      </p>
      <div className="mt-6">
        <RatingModal emptyState={true} />
      </div>
    </div>
  );
};

