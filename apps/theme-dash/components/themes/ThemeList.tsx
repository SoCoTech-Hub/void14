"use client";
import { CompleteTheme } from "@/lib/db/schema/themes";
import { trpc } from "@/lib/trpc/client";
import ThemeModal from "./ThemeModal";


export default function ThemeList({ themes }: { themes: CompleteTheme[] }) {
  const { data: t } = trpc.themes.getThemes.useQuery(undefined, {
    initialData: { themes },
    refetchOnMount: false,
  });

  if (t.themes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.themes.map((theme) => (
        <Theme theme={theme} key={theme.id} />
      ))}
    </ul>
  );
}

const Theme = ({ theme }: { theme: CompleteTheme }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{theme.name}</div>
      </div>
      <ThemeModal theme={theme} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No themes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new theme.
      </p>
      <div className="mt-6">
        <ThemeModal emptyState={true} />
      </div>
    </div>
  );
};

