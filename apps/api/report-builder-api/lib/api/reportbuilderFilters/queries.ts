import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ReportbuilderFilterId } from "../db/schema/reportbuilderFilters";
import { db } from "../db/index";
import {
  reportbuilderFilterIdSchema,
  reportbuilderFilters,
} from "../db/schema/reportbuilderFilters";

export const getReportbuilderFilters = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(reportbuilderFilters)
    .where(eq(reportbuilderFilters.userId, session?.user.id!));
  const r = rows;
  return { reportbuilderFilters: r };
};

export const getReportbuilderFilterById = async (id: ReportbuilderFilterId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderFilterId } = reportbuilderFilterIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(reportbuilderFilters)
    .where(
      and(
        eq(reportbuilderFilters.id, reportbuilderFilterId),
        eq(reportbuilderFilters.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const r = row;
  return { reportbuilderFilter: r };
};
