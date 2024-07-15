import RatingList from "@/components/ratings/RatingList";
import NewRatingModal from "@/components/ratings/RatingModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Ratings() {
  await checkAuth();
  const { ratings } = await api.ratings.getRatings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Ratings</h1>
        <NewRatingModal />
      </div>
      <RatingList ratings={ratings} />
    </main>
  );
}
