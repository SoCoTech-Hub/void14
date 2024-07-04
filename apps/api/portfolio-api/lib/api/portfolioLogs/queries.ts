import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { PortfolioLogId } from "../db/schema/portfolioLogs";
import { db } from "../db/index";
import { portfolioInstances } from "../db/schema/portfolioInstances";
import {
  portfolioLogIdSchema,
  portfolioLogs,
} from "../db/schema/portfolioLogs";
import { portfolioTempdatas } from "../db/schema/portfolioTempdatas";

export const getPortfolioLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      portfolioLog: portfolioLogs,
      portfolioInstance: portfolioInstances,
      portfolioTempdata: portfolioTempdatas,
    })
    .from(portfolioLogs)
    .leftJoin(
      portfolioInstances,
      eq(portfolioLogs.portfolioInstanceId, portfolioInstances.id),
    )
    .leftJoin(
      portfolioTempdatas,
      eq(portfolioLogs.portfolioTempdataId, portfolioTempdatas.id),
    )
    .where(eq(portfolioLogs.userId, session?.user.id!));
  const p = rows.map((r) => ({
    ...r.portfolioLog,
    portfolioInstance: r.portfolioInstance,
    portfolioTempdata: r.portfolioTempdata,
  }));
  return { portfolioLogs: p };
};

export const getPortfolioLogById = async (id: PortfolioLogId) => {
  const { session } = await getUserAuth();
  const { id: portfolioLogId } = portfolioLogIdSchema.parse({ id });
  const [row] = await db
    .select({
      portfolioLog: portfolioLogs,
      portfolioInstance: portfolioInstances,
      portfolioTempdata: portfolioTempdatas,
    })
    .from(portfolioLogs)
    .where(
      and(
        eq(portfolioLogs.id, portfolioLogId),
        eq(portfolioLogs.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      portfolioInstances,
      eq(portfolioLogs.portfolioInstanceId, portfolioInstances.id),
    )
    .leftJoin(
      portfolioTempdatas,
      eq(portfolioLogs.portfolioTempdataId, portfolioTempdatas.id),
    );
  if (row === undefined) return {};
  const p = {
    ...row.portfolioLog,
    portfolioInstance: row.portfolioInstance,
    portfolioTempdata: row.portfolioTempdata,
  };
  return { portfolioLog: p };
};
