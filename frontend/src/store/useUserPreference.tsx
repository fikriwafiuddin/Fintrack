import type { CurrencyCode } from "@/types"
import { create } from "zustand"

interface UserPreference {
  currencyCode: CurrencyCode
  setCurrencyCode: (code: CurrencyCode) => void
}

export const useUserPreference = create<UserPreference>()((set) => ({
  currencyCode: "IDR",
  setCurrencyCode: (code) => set({ currencyCode: code }),
}))
