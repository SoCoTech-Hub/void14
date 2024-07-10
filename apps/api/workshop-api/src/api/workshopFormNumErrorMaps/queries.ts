import { db } from "@soco/workshop-db/client";
import { eq } from "@soco/workshop-db";
import { type WorkshopFormNumErrorMapId, workshopFormNumErrorMapIdSchema, workshopFormNumErrorMaps } from "@soco/workshop-db/schema/workshopFormNumErrorMaps";
import { workshops } from "@soco/workshop-db/schema/workshops";

export const getWorkshopFormNumErrorMaps = async () => {
  const rows = await db.select({ workshopFormNumErrorMap: workshopFormNumErrorMaps, workshop: workshops }).from(workshopFormNumErrorMaps).leftJoin(workshops, eq(workshopFormNumErrorMaps.workshopId, workshops.id));
  const w = rows .map((r) => ({ ...r.workshopFormNumErrorMap, workshop: r.workshop})); 
  return { workshopFormNumErrorMaps: w };
};

export const getWorkshopFormNumErrorMapById = async (id: WorkshopFormNumErrorMapId) => {
  const { id: workshopFormNumErrorMapId } = workshopFormNumErrorMapIdSchema.parse({ id });
  const [row] = await db.select({ workshopFormNumErrorMap: workshopFormNumErrorMaps, workshop: workshops }).from(workshopFormNumErrorMaps).where(eq(workshopFormNumErrorMaps.id, workshopFormNumErrorMapId)).leftJoin(workshops, eq(workshopFormNumErrorMaps.workshopId, workshops.id));
  if (row === undefined) return {};
  const w =  { ...row.workshopFormNumErrorMap, workshop: row.workshop } ;
  return { workshopFormNumErrorMap: w };
};


