import ThemeComponentStyleList from "@/components/themeComponentStyles/ThemeComponentStyleList";
import NewThemeComponentStyleModal from "@/components/themeComponentStyles/ThemeComponentStyleModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ThemeComponentStyles() {
  await checkAuth();
  const { themeComponentStyles } = await api.themeComponentStyles.getThemeComponentStyles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Theme Component Styles</h1>
        <NewThemeComponentStyleModal />
      </div>
      <ThemeComponentStyleList themeComponentStyles={themeComponentStyles} />
    </main>
  );
}
