import type {
  NewProvinceParams,
  ProvinceId,
  UpdateProvinceParams,
} from "@soco/geolocalize-db/schema/provinces";
import { eq } from "@soco/geolocalize-db";
import { db } from "@soco/geolocalize-db/client";
import {
  insertProvinceSchema,
  provinceIdSchema,
  provinces,
  updateProvinceSchema,
} from "@soco/geolocalize-db/schema/provinces";

export const createProvince = async (province: NewProvinceParams) => {
  const newProvince = insertProvinceSchema.parse(province);
  try {
    const [p] = await db.insert(provinces).values(newProvince).returning();
    return { province: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateProvince = async (
  id: ProvinceId,
  province: UpdateProvinceParams,
) => {
  const { id: provinceId } = provinceIdSchema.parse({ id });
  const newProvince = updateProvinceSchema.parse(province);
  try {
    const [p] = await db
      .update(provinces)
      .set(newProvince)
      .where(eq(provinces.id, provinceId!))
      .returning();
    return { province: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteProvince = async (id: ProvinceId) => {
  const { id: provinceId } = provinceIdSchema.parse({ id });
  try {
    const [p] = await db
      .delete(provinces)
      .where(eq(provinces.id, provinceId!))
      .returning();
    return { province: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
