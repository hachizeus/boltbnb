export interface Listing {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  images: string[];
  host: {
    id: string;
    name: string;
    image: string;
    joinedDate: string;
    superhost: boolean;
  };
  price: number;
  currency: string;
  perNight: boolean;
  rating: number;
  reviewCount: number;
  amenities: string[];
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: string;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  savedListings: string[];
  bookings: Booking[];
}

export interface Booking {
  id: string;
  listingId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface SearchParams {
  location?: string;
  checkIn?: Date | null;
  checkOut?: Date | null;
  guests?: number;
}