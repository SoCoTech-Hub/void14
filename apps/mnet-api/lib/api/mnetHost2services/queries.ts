import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type MnetHost2serviceId, mnetHost2serviceIdSchema, mnetHost2services } from "@/lib/db/schema/mnetHost2services";
import { mnetHosts } from "@/lib/db/schema/mnetHosts";
import { mnetServices } from "@/lib/db/schema/mnetServices";

export const getMnetHost2services = async () => {
  const rows = await db.select({ mnetHost2service: mnetHost2services, mnetHost: mnetHosts, mnetService: mnetServices }).from(mnetHost2services).leftJoin(mnetHosts, eq(mnetHost2services.mnetHostId, mnetHosts.id)).leftJoin(mnetServices, eq(mnetHost2services.mnetServiceId, mnetServices.id));
  const m = rows .map((r) => ({ ...r.mnetHost2service, mnetHost: r.mnetHost, mnetService: r.mnetService})); 
  return { mnetHost2services: m };
};

export const getMnetHost2serviceById = async (id: MnetHost2serviceId) => {
  const { id: mnetHost2serviceId } = mnetHost2serviceIdSchema.parse({ id });
  const [row] = await db.select({ mnetHost2service: mnetHost2services, mnetHost: mnetHosts, mnetService: mnetServices }).from(mnetHost2services).where(eq(mnetHost2services.id, mnetHost2serviceId)).leftJoin(mnetHosts, eq(mnetHost2services.mnetHostId, mnetHosts.id)).leftJoin(mnetServices, eq(mnetHost2services.mnetServiceId, mnetServices.id));
  if (row === undefined) return {};
  const m =  { ...row.mnetHost2service, mnetHost: row.mnetHost, mnetService: row.mnetService } ;
  return { mnetHost2service: m };
};


