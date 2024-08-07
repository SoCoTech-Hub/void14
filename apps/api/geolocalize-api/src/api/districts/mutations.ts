import type {
  DistrictId,
  NewDistrictParams,
  UpdateDistrictParams,
} from "@soco/geolocalize-db/schema/districts";
import { eq } from "@soco/geolocalize-db";
import { db } from "@soco/geolocalize-db/client";
import {
  districtIdSchema,
  districts,
  insertDistrictSchema,
  updateDistrictSchema,
} from "@soco/geolocalize-db/schema/districts";

export const createDistrict = async (district: NewDistrictParams) => {
  const newDistrict = insertDistrictSchema.parse(district);
  try {
    const [d] = await db.insert(districts).values(newDistrict).returning();
    return { district: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDistrict = async (
  id: DistrictId,
  district: UpdateDistrictParams,
) => {
  const { id: districtId } = districtIdSchema.parse({ id });
  const newDistrict = updateDistrictSchema.parse(district);
  try {
    const [d] = await db
      .update(districts)
      .set(newDistrict)
      .where(eq(districts.id, districtId!))
      .returning();
    return { district: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDistrict = async (id: DistrictId) => {
  const { id: districtId } = districtIdSchema.parse({ id });
  try {
    const [d] = await db
      .delete(districts)
      .where(eq(districts.id, districtId!))
      .returning();
    return { district: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
