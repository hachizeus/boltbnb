import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Star, 
  Users, 
  Bed, 
  Bath, 
  Home, 
  Calendar, 
  Heart, 
  Share,
  Wifi,
  ParkingCircle,
  Utensils,
  Tv,
  Droplets,
  Snowflake,
  Car
} from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import { getListingById } from '../data/listings';
import { Listing } from '../types';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ListingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  // Load listing data
  useEffect(() => {
    if (!id) return;
    
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      const listingData = getListingById(id);
      
      if (listingData) {
        setListing(listingData);
        
        // Check if listing is saved by user
        if (isAuthenticated && user?.savedListings) {
          setIsSaved(user.savedListings.includes(id));
        }
      }
      
      setIsLoading(false);
    }, 500);
  }, [id, isAuthenticated, user]);
  
  // Calculate total price whenever dates change
  useEffect(() => {
    if (!listing || !checkIn || !checkOut) {
      setTotalPrice(0);
      return;
    }
    
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setTotalPrice(listing.price * diffDays);
  }, [listing, checkIn, checkOut]);
  
  const handleToggleSave = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save listings');
      return;
    }
    
    // This would connect to the backend in a real app
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved listings' : 'Added to saved listings');
  };
  
  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to make a booking');
      navigate('/login');
      return;
    }
    
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    
    // This would connect to the backend in a real app
    toast.success('Booking successful! Check your dashboard for details.');
    // Reset form after booking
    setCheckIn(null);
    setCheckOut(null);
    setGuests(1);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/2 mb-8"></div>
          <div className="h-96 bg-neutral-200 rounded-2xl mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-6 bg-neutral-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-6"></div>
            </div>
            <div className="h-64 bg-neutral-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!listing) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
        <p className="mb-6">The listing you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/search')}
          className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
        >
          Browse Listings
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Listing Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2 font-heading">
          {listing.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star size={18} className="text-accent-500 fill-accent-500 mr-1" />
              <span className="font-medium">{listing.rating}</span>
              <span className="mx-1 text-neutral-400">•</span>
              <span className="text-neutral-600">{listing.reviewCount} reviews</span>
            </div>
            
            <div className="text-neutral-600">
              <span>{listing.location.city}, {listing.location.country}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                // Create a dynamic share link
                navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
              }}
              className="flex items-center gap-1 px-3 py-2 border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Share size={16} />
              <span>Share</span>
            </button>
            
            <button 
              onClick={handleToggleSave}
              className="flex items-center gap-1 px-3 py-2 border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Heart size={16} className={isSaved ? "fill-error-500 text-error-500" : ""} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Image Carousel */}
      <div className="mb-8">
        <ImageCarousel images={listing.images} title={listing.title} />
      </div>
      
      {/* Listing Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Host and Property Details */}
          <div className="flex flex-col md:flex-row justify-between pb-6 border-b">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {listing.propertyType} hosted by {listing.host.name}
              </h2>
              
              <div className="flex items-center gap-4 text-neutral-600">
                <div className="flex items-center gap-1">
                  <Users size={18} />
                  <span>{listing.maxGuests} guests</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Bed size={18} />
                  <span>{listing.beds} bed{listing.beds !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Bath size={18} />
                  <span>{listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
                <img 
                  src={listing.host.image}
                  alt={listing.host.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {listing.host.superhost && (
                <div className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                  Superhost
                </div>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div className="py-6 border-b">
            <h2 className="text-xl font-semibold mb-4">About this place</h2>
            <p className="text-neutral-700 whitespace-pre-line">
              {listing.description}
            </p>
          </div>
          
          {/* Amenities */}
          <div className="py-6 border-b">
            <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listing.amenities.includes('Wifi') && (
                <div className="flex items-center gap-3">
                  <Wifi size={20} className="text-neutral-700" />
                  <span>Wifi</span>
                </div>
              )}
              
              {listing.amenities.includes('Free parking') && (
                <div className="flex items-center gap-3">
                  <ParkingCircle size={20} className="text-neutral-700" />
                  <span>Free parking</span>
                </div>
              )}
              
              {listing.amenities.includes('Kitchen') && (
                <div className="flex items-center gap-3">
                  <Utensils size={20} className="text-neutral-700" />
                  <span>Kitchen</span>
                </div>
              )}
              
              {listing.amenities.includes('TV') && (
                <div className="flex items-center gap-3">
                  <Tv size={20} className="text-neutral-700" />
                  <span>TV</span>
                </div>
              )}
              
              {listing.amenities.includes('Hot tub') && (
                <div className="flex items-center gap-3">
                  <Droplets size={20} className="text-neutral-700" />
                  <span>Hot tub</span>
                </div>
              )}
              
              {listing.amenities.includes('Air conditioning') && (
                <div className="flex items-center gap-3">
                  <Snowflake size={20} className="text-neutral-700" />
                  <span>Air conditioning</span>
                </div>
              )}
              
              {/* Show the first 6 amenities */}
              {listing.amenities.slice(0, 6).map((amenity, index) => {
                // Skip the ones we already explicitly checked for
                if (['Wifi', 'Free parking', 'Kitchen', 'TV', 'Hot tub', 'Air conditioning'].includes(amenity)) {
                  return null;
                }
                
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Home size={20} className="text-neutral-700" />
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>
            
            {listing.amenities.length > 6 && (
              <button className="mt-4 text-secondary-600 font-medium hover:underline">
                Show all {listing.amenities.length} amenities
              </button>
            )}
          </div>
          
          {/* Location */}
          <div className="py-6">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <p className="text-neutral-700 mb-4">
              {listing.location.city}, {listing.location.country}
            </p>
            
            <div className="bg-neutral-200 h-64 rounded-2xl flex items-center justify-center">
              <p className="text-neutral-500">Map view would be displayed here</p>
            </div>
          </div>
        </div>
        
        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-medium border border-neutral-200">
            <div className="flex items-baseline justify-between mb-4">
              <div className="text-xl font-semibold">
                {listing.currency} {listing.price}
                <span className="text-neutral-500 text-base font-normal"> / night</span>
              </div>
              
              <div className="flex items-center">
                <Star size={16} className="text-accent-500 fill-accent-500 mr-1" />
                <span>{listing.rating}</span>
              </div>
            </div>
            
            <div className="border border-neutral-300 rounded-2xl overflow-hidden mb-4">
              <div className="grid grid-cols-2 divide-x divide-neutral-300">
                <div className="p-3">
                  <label className="block text-xs text-neutral-500 mb-1">CHECK-IN</label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    placeholderText="Add date"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
                
                <div className="p-3">
                  <label className="block text-xs text-neutral-500 mb-1">CHECKOUT</label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn || new Date()}
                    placeholderText="Add date"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="border-t border-neutral-300 p-3">
                <label className="block text-xs text-neutral-500 mb-1">GUESTS</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full text-sm focus:outline-none"
                >
                  {[...Array(listing.maxGuests)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1} guest{index !== 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={handleBooking}
              className="w-full py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transition-colors mb-4"
            >
              {checkIn && checkOut ? 'Reserve' : 'Check availability'}
            </button>
            
            {totalPrice > 0 && checkIn && checkOut && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-neutral-700 underline">
                    {listing.currency} {listing.price} x {Math.ceil(Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights
                  </div>
                  <div>{listing.currency} {totalPrice}</div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="text-neutral-700 underline">Cleaning fee</div>
                  <div>{listing.currency} 50</div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="text-neutral-700 underline">Service fee</div>
                  <div>{listing.currency} {Math.round(totalPrice * 0.12)}</div>
                </div>
                
                <div className="border-t border-neutral-300 mt-4 pt-4 flex justify-between items-center font-semibold">
                  <div>Total</div>
                  <div>{listing.currency} {totalPrice + 50 + Math.round(totalPrice * 0.12)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;