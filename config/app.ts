import {getLocalStorage} from "@/utils/storage";

export const APP_NAME = "As Kadro"
export const LANGUAGE = getLocalStorage("lang") || "tr"
export const CACHE_TIMEOUT = 48 * (60 * 4000) // 32 hour
export const CACHE_TIME_64_HOUR = 96 * 60 * 4000
export const CACHE_TIME_32_HOUR = 48 * 60 * 4000
export const CACHE_TIME_16_HOUR = 24 * 60 * 4000
export const CACHE_TIME_8_HOUR = 16 * 60 * 4000
export const CACHE_TIME_4_HOUR = 8 * 60 * 4000
export const CACHE_TIME_2_HOUR = 4 * 60 * 4000
export const CACHE_TIME_1_HOUR = 2 * 60 * 4000
