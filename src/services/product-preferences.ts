"use server";

import type { Address } from "@/types";
import { cookies } from "next/headers";

export interface ProductPreferences {
  size?: string;
  color?: string;
  address?: Address;
  zipCode?: string;
  image?: string;
  favorite?: boolean;
}

export async function setProductPreferences(
  productId: string,
  preferences: ProductPreferences
) {
  const cookieStore = await cookies();
  const existing = cookieStore.get("productPreferences")?.value;

  const allPreferences = existing ? JSON.parse(existing) : {};

  const existingProductPrefs = allPreferences[productId] || {};

  const mergedPreferences = {
    ...existingProductPrefs,
    ...preferences,
  };

  allPreferences[productId] = mergedPreferences;

  cookieStore.set("productPreferences", JSON.stringify(allPreferences), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15, // 15 min
    path: "/",
  });
}

export async function getProductPreference(productId: string) {
  const cookieStore = await cookies();
  const existing = cookieStore.get("productPreferences")?.value;
  const preferences = existing ? JSON.parse(existing) : null;

  return (preferences?.[productId] as ProductPreferences) ?? null;
}
