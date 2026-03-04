const PROMPT_GUIDE_ACCESS_COOKIE = "prompt_guide_access";
const PROMPT_GUIDE_ACCESS_GRANTED = "granted";
const PROMPT_GUIDE_COOKIE_LIFETIME_DAYS = 3650;

export const PAYMENT_STATUS_QUERY_PARAM = "paymentStatus";
export const PAYMENT_PRODUCT_QUERY_PARAM = "product";
export const PAYMENT_SUCCESS_VALUE = "success";
export const PROMPT_GUIDE_PRODUCT_ID = "prompt-guide";

function getCookieValue(cookieName: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));

  if (!match) {
    return null;
  }

  const cookieValue = match[1];
  if (cookieValue === undefined) {
    return null;
  }

  return decodeURIComponent(cookieValue);
}

export function hasPromptGuideAccess(): boolean {
  return getCookieValue(PROMPT_GUIDE_ACCESS_COOKIE) === PROMPT_GUIDE_ACCESS_GRANTED;
}

export function grantPromptGuideAccess(): void {
  if (typeof document === "undefined") {
    return;
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + PROMPT_GUIDE_COOKIE_LIFETIME_DAYS);

  document.cookie = [
    `${PROMPT_GUIDE_ACCESS_COOKIE}=${encodeURIComponent(PROMPT_GUIDE_ACCESS_GRANTED)}`,
    `expires=${expiresAt.toUTCString()}`,
    "path=/",
    "SameSite=Lax",
  ].join("; ");
}
