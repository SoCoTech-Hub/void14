import ThemeList from "@/components/themes/ThemeList";
import NewThemeModal from "@/components/themes/ThemeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Themes() {
  await checkAuth();
  const { themes } = await api.themes.getThemes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Themes</h1>
        <NewThemeModal />
      </div>
      <ThemeList themes={themes} />
    </main>
  );
}
