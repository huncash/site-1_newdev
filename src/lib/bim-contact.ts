import { BIM_CONFIG, bimPhoneVisible } from "@/config/bim";

/** @deprecated Prefer BIM_CONFIG / bimPhoneVisible — kompatibilitás a meglévő importokhoz. */
export const BIM_PHONE_DISPLAY = BIM_CONFIG.phoneDisplay;
export const BIM_PHONE_TEL = BIM_CONFIG.phoneTel;
export { bimPhoneVisible };
