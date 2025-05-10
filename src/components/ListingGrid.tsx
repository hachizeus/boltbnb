import React from 'react';
import { Listing } from '../types';
import ListingCard from './ListingCard';
import { useAuth } from '../context/AuthContext';

interface ListingGridProps {
  listings: Listing[];
  onToggleSave?: (id: string) => void;
}

const ListingGrid: React.FC<ListingGridProps> = ({ listings, onToggleSave }) => {
  const { user, isAuthenticated } = useAuth();
  
  const savedListings = user?.savedListings || [];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map(listing => (
        <ListingCard 
          key={listing.id} 
          listing={listing} 
          isSaved={isAuthenticated && savedListings.includes(listing.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
};

export default ListingGrid;