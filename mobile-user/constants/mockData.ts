export interface BeachItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  imageUrl: string;
}

export const CATEGORIES = [
  { id: "1", name: "Populer", icon: "fire" },
  { id: "2", name: "Pasir Putih", icon: "beach-access" },
  { id: "3", name: "Snorkeling", icon: "water" },
  { id: "4", name: "Sunset", icon: "sunny" },
];

export const POPULAR_BEACHES: BeachItem[] = [
  {
    id: "beach-1",
    name: "Pantai Klara",
    location: "Pesawaran",
    rating: 4.8,
    price: 25000,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: "beach-2",
    name: "Pantai Sari Ringgung",
    location: "Pesawaran",
    rating: 4.6,
    price: 25000,
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206",
  },
];
