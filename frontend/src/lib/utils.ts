import type { CurrencyCode } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getContrastColor(hex: string): string {
  // hapus tanda #
  hex = hex.replace("#", "")

  // convert ke RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // hitung luminance (persepsi manusia)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // kalau terang → pakai hitam, kalau gelap → pakai putih
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

export const formatCurrencyValue = (
  amount: number,
  code: CurrencyCode
): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: code,
  }).format(amount)
}
