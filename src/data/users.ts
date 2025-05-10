import { User } from '../types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    savedListings: ['1', '3'],
    bookings: [
      {
        id: 'booking1',
        listingId: '2',
        userId: 'user1',
        checkIn: '2025-07-15',
        checkOut: '2025-07-20',
        guests: 4,
        totalPrice: 2250,
        status: 'confirmed',
        createdAt: '2025-05-10',
      }
    ]
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    savedListings: ['2', '5'],
    bookings: [
      {
        id: 'booking2',
        listingId: '4',
        userId: 'user2',
        checkIn: '2025-08-05',
        checkOut: '2025-08-10',
        guests: 2,
        totalPrice: 875,
        status: 'pending',
        createdAt: '2025-06-15',
      }
    ]
  }
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};