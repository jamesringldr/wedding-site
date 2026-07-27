export type ItineraryEvent = {
  title: string;
  date: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

export const ITINERARY_EVENTS: ItineraryEvent[] = [
  {
    title: "Boat Day",
    date: "Thursday, June 10th",
    description: LOREM,
    imageSrc: "/assets/Itenerary_RSVP/Boat_day.jpg",
    imageAlt: "Boat day on the water in Cancún",
  },
  {
    title: "Welcome Party",
    date: "Friday, June 11th",
    description: LOREM,
    imageSrc: "/assets/Itenerary_RSVP/WelcomeParty.webp",
    imageAlt: "Welcome party gathering",
  },
  {
    title: "Ceremony",
    date: "Saturday, June 12th",
    description: LOREM,
    imageSrc: "/assets/Itenerary_RSVP/Ceremony.jpg",
    imageAlt: "Wedding ceremony",
  },
];
