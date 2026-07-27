/** Wedding block promo for Finest Playa Mujeres booking. */
export const RESORT_PROMO_CODE = "MAWJUN27FPM";

const BOOKING_BASE =
  "https://booking.finestresorts.com/en/bookcore/availability/finestplaya";

export type ResortBookingParams = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  /** Number of rooms — Finest uses this for `rrc` / `occp`. */
  rooms?: number;
  promoCode?: string;
};

/**
 * Builds a Finest bookcore availability URL from guest selections.
 *
 * Example (Jun 9–13, 2 adults, 0 children):
 * https://booking.finestresorts.com/en/bookcore/availability/finestplaya/2027-06-09/2027-06-13/2/0/?cp=MAWJUN27FPM&rrc=1&adults=2&occupancies=...&occp=1
 *
 * Path: /{checkIn}/{checkOut}/{adults}/{children}/
 * `occupancies` is the occupancy JSON double-encoded (Finest’s format).
 */
export function buildResortBookingUrl({
  checkIn,
  checkOut,
  adults,
  children,
  rooms = 1,
  promoCode = RESORT_PROMO_CODE,
}: ResortBookingParams): string {
  const occupancyJson = JSON.stringify([
    { adults, children, ages: "" },
  ]).replace(/:/g, ": ").replace(/,/g, ", ");

  const params = new URLSearchParams({
    cp: promoCode,
    rrc: String(rooms),
    adults: String(adults),
    occupancies: encodeURIComponent(occupancyJson),
    occp: String(rooms),
  });

  return `${BOOKING_BASE}/${checkIn}/${checkOut}/${adults}/${children}/?${params.toString()}`;
}
