import { Listing } from '../types';

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Modern Loft with Ocean View',
    description: 'Enjoy breathtaking ocean views from this modern loft apartment. Perfect for couples looking for a romantic getaway or solo travelers seeking peace and tranquility. This stylish loft features a fully equipped kitchen, a comfortable queen-sized bed, and a spacious living area with large windows overlooking the ocean.',
    location: {
      city: 'Malibu',
      country: 'United States',
      address: '123 Coastal Highway',
      lat: 34.025922,
      lng: -118.779757,
    },
    images: [
      'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg',
    ],
    host: {
      id: 'host1',
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
      joinedDate: '2018-05-12',
      superhost: true,
    },
    price: 250,
    currency: 'USD',
    perNight: true,
    rating: 4.92,
    reviewCount: 124,
    amenities: ['Wifi', 'Kitchen', 'Free parking', 'Washer', 'Air conditioning', 'Hot tub', 'TV', 'Pool'],
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    propertyType: 'Apartment',
    featured: true,
  },
  {
    id: '2',
    title: 'Luxurious Villa with Private Pool',
    description: 'Escape to this stunning villa with a private pool and lush garden. Perfect for families or groups seeking a luxurious retreat. This spacious villa offers 4 bedrooms, a fully equipped gourmet kitchen, a large dining area, and multiple outdoor lounging spaces.',
    location: {
      city: 'Bali',
      country: 'Indonesia',
      address: '456 Beach Road',
      lat: -8.409518,
      lng: 115.188919,
    },
    images: [
      'https://images.pexels.com/photos/32870/pexels-photo.jpg',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg',
    ],
    host: {
      id: 'host2',
      name: 'Michael Chen',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      joinedDate: '2019-03-22',
      superhost: true,
    },
    price: 450,
    currency: 'USD',
    perNight: true,
    rating: 4.85,
    reviewCount: 89,
    amenities: ['Wifi', 'Kitchen', 'Free parking', 'Washer', 'Air conditioning', 'Hot tub', 'TV', 'Pool', 'Gym'],
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    maxGuests: 8,
    propertyType: 'Villa',
    featured: true,
  },
  {
    id: '3',
    title: 'Cozy Mountain Cabin with Fireplace',
    description: 'Experience the charm of this cozy mountain cabin with a beautiful stone fireplace. Perfect for a winter getaway or a summer hiking adventure. This rustic cabin features a well-equipped kitchen, a comfortable living room with a fireplace, and a spacious deck overlooking the mountains.',
    location: {
      city: 'Aspen',
      country: 'United States',
      address: '789 Pine Road',
      lat: 39.191097,
      lng: -106.817535,
    },
    images: [
      'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg',
      'https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
    ],
    host: {
      id: 'host3',
      name: 'Emily Wilson',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      joinedDate: '2020-01-15',
      superhost: false,
    },
    price: 195,
    currency: 'USD',
    perNight: true,
    rating: 4.79,
    reviewCount: 67,
    amenities: ['Wifi', 'Kitchen', 'Free parking', 'Fireplace', 'Heating', 'TV', 'BBQ grill'],
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    maxGuests: 4,
    propertyType: 'Cabin',
    featured: true,
  },
  {
    id: '4',
    title: 'Historic Downtown Apartment',
    description: 'Stay in this charming apartment located in the heart of the historic downtown district. Perfect for travelers who want to explore the city on foot. This stylish apartment features high ceilings, original hardwood floors, and modern amenities.',
    location: {
      city: 'Charleston',
      country: 'United States',
      address: '101 King Street',
      lat: 32.776566,
      lng: -79.931503,
    },
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
    ],
    host: {
      id: 'host4',
      name: 'David Brown',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      joinedDate: '2019-08-10',
      superhost: true,
    },
    price: 175,
    currency: 'USD',
    perNight: true,
    rating: 4.88,
    reviewCount: 95,
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Heating', 'Washer', 'Dryer', 'TV'],
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    maxGuests: 3,
    propertyType: 'Apartment',
    featured: true,
  },
  {
    id: '5',
    title: 'Secluded Beach House with Direct Access',
    description: 'Escape to this secluded beach house with direct access to a private beach. Perfect for beach lovers and families seeking privacy and relaxation. This beautiful beach house features a spacious open-plan living area, a fully equipped kitchen, and a large deck overlooking the ocean.',
    location: {
      city: 'Tulum',
      country: 'Mexico',
      address: '202 Playa Road',
      lat: 20.209285,
      lng: -87.465225,
    },
    images: [
      'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
      'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg',
    ],
    host: {
      id: 'host5',
      name: 'Sofia Rodriguez',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      joinedDate: '2018-12-03',
      superhost: true,
    },
    price: 320,
    currency: 'USD',
    perNight: true,
    rating: 4.95,
    reviewCount: 108,
    amenities: ['Wifi', 'Kitchen', 'Free parking', 'Washer', 'Air conditioning', 'Hot tub', 'TV', 'Beach access', 'BBQ grill'],
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: 'House',
    featured: true,
  },
  {
    id: '6',
    title: 'Trendy Urban Loft in Arts District',
    description: 'Experience city living in this trendy loft located in the vibrant arts district. Perfect for urban explorers and art enthusiasts. This stylish loft features industrial-inspired design elements, high ceilings, and large windows providing plenty of natural light.',
    location: {
      city: 'Brooklyn',
      country: 'United States',
      address: '303 Gallery Street',
      lat: 40.712775,
      lng: -73.966522,
    },
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg',
      'https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg',
    ],
    host: {
      id: 'host6',
      name: 'James Martin',
      image: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg',
      joinedDate: '2020-05-20',
      superhost: false,
    },
    price: 210,
    currency: 'USD',
    perNight: true,
    rating: 4.82,
    reviewCount: 73,
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Heating', 'Washer', 'Dryer', 'TV', 'Gym'],
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    maxGuests: 3,
    propertyType: 'Loft',
    featured: true,
  }
];

export const getFeaturedListings = (): Listing[] => {
  return listings.filter(listing => listing.featured);
};

export const getListingById = (id: string): Listing | undefined => {
  return listings.find(listing => listing.id === id);
};

export const searchListings = (searchParams: { 
  location?: string; 
  guests?: number;
}): Listing[] => {
  let filteredListings = [...listings];
  
  if (searchParams.location) {
    const locationLower = searchParams.location.toLowerCase();
    filteredListings = filteredListings.filter(listing => 
      listing.location.city.toLowerCase().includes(locationLower) || 
      listing.location.country.toLowerCase().includes(locationLower)
    );
  }
  
  if (searchParams.guests) {
    filteredListings = filteredListings.filter(listing => 
      listing.maxGuests >= searchParams.guests!
    );
  }
  
  return filteredListings;
};