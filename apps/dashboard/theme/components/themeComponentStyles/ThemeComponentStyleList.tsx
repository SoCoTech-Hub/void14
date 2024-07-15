"use client";
import { CompleteThemeComponentStyle } from "@soco/theme-db/schema/themeComponentStyles";
import { trpc } from "@/lib/trpc/client";
import ThemeComponentStyleModal from "./ThemeComponentStyleModal";


export default function ThemeComponentStyleList({ themeComponentStyles }: { themeComponentStyles: CompleteThemeComponentStyle[] }) {
  const { data: t } = trpc.themeComponentStyles.getThemeComponentStyles.useQuery(undefined, {
    initialData: { themeComponentStyles },
    refetchOnMount: false,
  });

  if (t.themeComponentStyles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.themeComponentStyles.map((themeComponentStyle) => (
        <ThemeComponentStyle themeComponentStyle={themeComponentStyle} key={themeComponentStyle.themeComponentStyle.id} />
      ))}
    </ul>
  );
}

const ThemeComponentStyle = ({ themeComponentStyle }: { themeComponentStyle: CompleteThemeComponentStyle }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{themeComponentStyle.themeComponentStyle.themeId}</div>
      </div>
      <ThemeComponentStyleModal themeComponentStyle={themeComponentStyle.themeComponentStyle} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No theme component styles
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new theme component style.
      </p>
      <div className="mt-6">
        <ThemeComponentStyleModal emptyState={true} />
      </div>
    </div>
  );
};

