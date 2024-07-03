import ThemeComponentList from "@/components/themeComponents/ThemeComponentList";
import NewThemeComponentModal from "@/components/themeComponents/ThemeComponentModal";
import { api } from "@/lib/trpc/api";

export default async function ThemeComponents() {
  const { themeComponents } = await api.themeComponents.getThemeComponents.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Theme Components</h1>
        <NewThemeComponentModal />
      </div>
      <ThemeComponentList themeComponents={themeComponents} />
    </main>
  );
}
