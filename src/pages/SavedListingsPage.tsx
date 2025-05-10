import React, { useEffect, useState } from 'react';
import { Heart, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getListingById } from '../data/listings';
import { Listing } from '../types';
import ListingGrid from '../components/ListingGrid';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SavedListingsPage: React.FC = () => {
  const { user } = useAuth();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!user) return;
    
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      const listings = user.savedListings
        .map(id => getListingById(id))
        .filter((listing): listing is Listing => !!listing);
      
      setSavedListings(listings);
      setIsLoading(false);
    }, 500);
  }, [user]);
  
  const handleToggleSave = (id: string) => {
    // This would connect to the backend in a real app
    setSavedListings(prevListings => prevListings.filter(listing => listing.id !== id));
    toast.success('Listing removed from saved items');
  };
  
  if (!user) {
    return null; // Protected route will handle this
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-8 font-heading">
        Saved Listings
      </h1>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-neutral-200 rounded-full mb-4"></div>
            <div className="h-4 w-36 bg-neutral-200 rounded"></div>
          </div>
        </div>
      ) : savedListings.length > 0 ? (
        <ListingGrid 
          listings={savedListings}
          onToggleSave={handleToggleSave}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-soft p-10 text-center">
          <Heart size={48} className="mx-auto mb-4 text-neutral-400" />
          <h2 className="text-xl font-semibold mb-2">No saved listings yet</h2>
          <p className="text-neutral-600 mb-6">
            Save your favorite places to stay and easily find them later.
          </p>
          <Link 
            to="/search"
            className="inline-block px-6 py-3 bg-secondary-500 text-white rounded-xl hover:bg-secondary-600 transition-colors flex items-center gap-2 justify-center mx-auto"
          >
            <Search size={20} />
            <span>Browse Listings</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedListingsPage;