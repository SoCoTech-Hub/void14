"use client";
import { CompleteThemeComponent } from "@soco/theme-db/schema/themeComponents";
import { trpc } from "@/lib/trpc/client";
import ThemeComponentModal from "./ThemeComponentModal";


export default function ThemeComponentList({ themeComponents }: { themeComponents: CompleteThemeComponent[] }) {
  const { data: t } = trpc.themeComponents.getThemeComponents.useQuery(undefined, {
    initialData: { themeComponents },
    refetchOnMount: false,
  });

  if (t.themeComponents.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.themeComponents.map((themeComponent) => (
        <ThemeComponent themeComponent={themeComponent} key={themeComponent.id} />
      ))}
    </ul>
  );
}

const ThemeComponent = ({ themeComponent }: { themeComponent: CompleteThemeComponent }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{themeComponent.name}</div>
      </div>
      <ThemeComponentModal themeComponent={themeComponent} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No theme components
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new theme component.
      </p>
      <div className="mt-6">
        <ThemeComponentModal emptyState={true} />
      </div>
    </div>
  );
};

