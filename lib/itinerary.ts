export type ItineraryEvent = {
  title: string;
  date: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const ITINERARY_EVENTS: ItineraryEvent[] = [
  {
    title: "Boat Day",
    date: "Thursday, June 10th",
    description:
      "As a thank you, we’d love to have you for an all-inclusive day on the Caribbean Sea just outside Cancún — food, drinks, and music included, with stops to snorkel and swim.",
    imageSrc: "/assets/Itenerary_RSVP/Boat_day.jpg",
    imageAlt: "Boat day on the water in Cancún",
  },
  {
    title: "Welcome Party",
    date: "Friday, June 11th",
    description:
      "Join us for a welcome cocktail hour with specialty drinks and a mariachi band — a chance to catch up and officially kick off the wedding festivities together.",
    imageSrc: "/assets/Itenerary_RSVP/WelcomeParty.webp",
    imageAlt: "Welcome party gathering",
  },
  {
    title: "Ceremony",
    date: "Saturday, June 12th",
    description:
      "Come celebrate with us as we officially tie the knot on the beach — dress is beach semi-formal, toes-in-the-sand vibes welcome.",
    imageSrc: "/assets/Itenerary_RSVP/Ceremony.jpg",
    imageAlt: "Wedding ceremony",
  },
];
