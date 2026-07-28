export type RsvpStatus = "attending" | "declined";

export type RsvpPayload = {
  status: RsvpStatus;
  fullName?: string;
  partyName?: string;
  email?: string;
  phone?: string;
  guests?: string[];
  boatDay?: boolean;
  welcomeParty?: boolean;
  ceremony?: boolean;
  roomReserved?: "yes" | "no" | "";
};

/**
 * Posts an RSVP to the Google Apps Script web app.
 * Uses text/plain so the browser skips a CORS preflight (Apps Script
 * does not handle OPTIONS well).
 */
export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_RSVP_WEB_APP_URL;

  if (!endpoint) {
    throw new Error(
      "RSVP endpoint is not configured. Set NEXT_PUBLIC_RSVP_WEB_APP_URL.",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("Could not save your RSVP. Please try again.");
  }

  const result: unknown = await response.json().catch(() => null);
  if (
    result &&
    typeof result === "object" &&
    "ok" in result &&
    (result as { ok: unknown }).ok === false
  ) {
    throw new Error("Could not save your RSVP. Please try again.");
  }
}
