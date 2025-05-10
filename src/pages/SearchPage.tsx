import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, MapPin } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ListingGrid from '../components/ListingGrid';
import { searchListings } from '../data/listings';
import { Listing } from '../types';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const location = searchParams.get('location') || '';
  const guests = searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : undefined;
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      const results = searchListings({
        location: location || undefined,
        guests: guests || undefined
      });
      
      setListings(results);
      setIsLoading(false);
    }, 500);
  }, [location, guests]);
  
  const handleToggleSave = (id: string) => {
    if (!isAuthenticated) {
      toast.error('Please log in to save listings');
      return;
    }
    
    // This would connect to the backend in a real app
    toast.success('Listing saved successfully');
  };

  return (
    <div className="py-8 px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-800 mb-6 font-heading">
            {location 
              ? `Stays in ${location}`
              : 'All Accommodations'
            }
          </h1>
          
          <SearchBar isCompact={true} className="mb-6" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-neutral-600">
              <MapPin size={18} className="mr-1" />
              <span>{listings.length} {listings.length === 1 ? 'stay' : 'stays'} available</span>
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
          
          {isFilterOpen && (
            <div className="mt-4 p-6 bg-white rounded-2xl shadow-medium animate-slide-up">
              <h3 className="font-semibold text-lg mb-4">Filter by:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Price Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min"
                      className="w-full p-2 border border-neutral-300 rounded-lg"
                    />
                    <span>-</span>
                    <input 
                      type="number" 
                      placeholder="Max"
                      className="w-full p-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Property Type
                  </label>
                  <select className="w-full p-2 border border-neutral-300 rounded-lg">
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="cabin">Cabin</option>
                    <option value="loft">Loft</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Bedrooms
                  </label>
                  <select className="w-full p-2 border border-neutral-300 rounded-lg">
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="wifi" className="mr-2" />
                      <label htmlFor="wifi">WiFi</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="pool" className="mr-2" />
                      <label htmlFor="pool">Pool</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="kitchen" className="mr-2" />
                      <label htmlFor="kitchen">Kitchen</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 gap-2">
                <button 
                  className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Clear All
                </button>
                <button 
                  className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-neutral-200 rounded-full mb-4"></div>
              <div className="h-4 w-36 bg-neutral-200 rounded"></div>
            </div>
          </div>
        ) : listings.length > 0 ? (
          <ListingGrid 
            listings={listings}
            onToggleSave={handleToggleSave}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your search criteria or explore different locations.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;