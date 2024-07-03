import ScaleList from "@/components/scales/ScaleList";
import NewScaleModal from "@/components/scales/ScaleModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Scales() {
  await checkAuth();
  const { scales } = await api.scales.getScales.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scales</h1>
        <NewScaleModal />
      </div>
      <ScaleList scales={scales} />
    </main>
  );
}
