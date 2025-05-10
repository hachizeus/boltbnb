import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Filter, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getListingById } from '../data/listings';

const BookingsPage: React.FC = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  if (!user) {
    return null; // Protected route will handle this
  }
  
  const filteredBookings = user.bookings.filter(booking => {
    if (statusFilter === 'all') return true;
    return booking.status === statusFilter;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 font-heading">
          My Bookings
        </h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors">
              <Filter size={18} />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent appearance-none focus:outline-none pr-8"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {filteredBookings.length > 0 ? (
        <div className="space-y-6">
          {filteredBookings.map(booking => {
            const listing = getListingById(booking.listingId);
            if (!listing) return null;
            
            const checkInDate = new Date(booking.checkIn);
            const checkOutDate = new Date(booking.checkOut);
            const isUpcoming = checkInDate > new Date();
            
            return (
              <div 
                key={booking.id} 
                className="bg-white rounded-2xl shadow-soft overflow-hidden border border-neutral-200"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 lg:w-1/4">
                    <img 
                      src={listing.images[0]} 
                      alt={listing.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <Link 
                          to={`/listings/${listing.id}`}
                          className="text-xl font-semibold hover:text-secondary-600 transition-colors"
                        >
                          {listing.title}
                        </Link>
                        <p className="text-neutral-600">
                          {listing.location.city}, {listing.location.country}
                        </p>
                      </div>
                      
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-success-100 text-success-900' 
                          : booking.status === 'pending'
                          ? 'bg-warning-100 text-warning-900'
                          : booking.status === 'cancelled'
                          ? 'bg-error-100 text-error-900'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-6 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={18} className="text-neutral-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Check-in</p>
                            <p className="font-medium">{checkInDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-neutral-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Check-out</p>
                            <p className="font-medium">{checkOutDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Guests</p>
                        <p className="font-medium">{booking.guests} guest{booking.guests !== 1 ? 's' : ''}</p>
                        
                        <p className="text-sm text-neutral-500 mt-2 mb-1">Total Price</p>
                        <p className="font-semibold">{listing.currency} {booking.totalPrice}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Link 
                        to={`/listings/${listing.id}`}
                        className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
                      >
                        View Listing
                      </Link>
                      
                      {isUpcoming && booking.status !== 'cancelled' && (
                        <button className="px-4 py-2 border border-error-300 text-error-600 rounded-lg hover:bg-error-50 transition-colors text-sm">
                          Cancel Booking
                        </button>
                      )}
                      
                      <button className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors text-sm flex items-center gap-1">
                        <MessageSquare size={16} />
                        <span>Contact Host</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft p-10 text-center">
          <Calendar size={48} className="mx-auto mb-4 text-neutral-400" />
          <h2 className="text-xl font-semibold mb-2">No bookings found</h2>
          <p className="text-neutral-600 mb-6">
            {statusFilter === 'all'
              ? "You haven't made any bookings yet."
              : `You don't have any ${statusFilter} bookings.`}
          </p>
          <Link 
            to="/search"
            className="inline-block px-6 py-3 bg-secondary-500 text-white rounded-xl hover:bg-secondary-600 transition-colors"
          >
            Find Places to Stay
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;