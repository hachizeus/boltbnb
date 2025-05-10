import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Book, Heart, Settings, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getListingById } from '../data/listings';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile'>('overview');
  
  if (!user) {
    return null; // Protected route will handle this
  }
  
  const upcomingBookings = user.bookings.filter(booking => 
    new Date(booking.checkIn) > new Date() && booking.status !== 'cancelled'
  );
  
  const pastBookings = user.bookings.filter(booking => 
    new Date(booking.checkOut) < new Date() || booking.status === 'cancelled'
  );
  
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2 font-heading">
        Dashboard
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 rounded-full bg-secondary-100 overflow-hidden mr-3">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary-100 text-secondary-500 font-semibold text-lg">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-neutral-500 text-sm">{user.email}</p>
              </div>
            </div>
            
            <button className="w-full text-center py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
              Edit Profile
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft">
            <ul>
              <li>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-3 p-4 w-full text-left transition-colors ${
                    activeTab === 'overview' 
                      ? 'text-secondary-600 bg-secondary-50 font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Calendar size={20} className={activeTab === 'overview' ? 'text-secondary-500' : 'text-neutral-500'} />
                  <span>Dashboard</span>
                </button>
              </li>
              
              <li>
                <Link 
                  to="/bookings"
                  className="flex items-center gap-3 p-4 w-full text-left text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Book size={20} className="text-neutral-500" />
                  <span>My Bookings</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/saved"
                  className="flex items-center gap-3 p-4 w-full text-left text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Heart size={20} className="text-neutral-500" />
                  <span>Saved Listings</span>
                </Link>
              </li>
              
              <li>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-3 p-4 w-full text-left transition-colors ${
                    activeTab === 'profile' 
                      ? 'text-secondary-600 bg-secondary-50 font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Settings size={20} className={activeTab === 'profile' ? 'text-secondary-500' : 'text-neutral-500'} />
                  <span>Account Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'overview' ? (
            <>
              {/* Welcome Card */}
              <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="text-neutral-600 mb-4">
                  Here's a summary of your activity and upcoming trips.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary-50 p-4 rounded-xl">
                    <h3 className="text-sm font-medium text-primary-800 mb-1">Upcoming Trips</h3>
                    <p className="text-2xl font-semibold text-primary-900">{upcomingBookings.length}</p>
                  </div>
                  
                  <div className="bg-secondary-50 p-4 rounded-xl">
                    <h3 className="text-sm font-medium text-secondary-800 mb-1">Completed Stays</h3>
                    <p className="text-2xl font-semibold text-secondary-900">{pastBookings.length}</p>
                  </div>
                  
                  <div className="bg-accent-50 p-4 rounded-xl">
                    <h3 className="text-sm font-medium text-accent-800 mb-1">Saved Listings</h3>
                    <p className="text-2xl font-semibold text-accent-900">{user.savedListings.length}</p>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Bookings */}
              <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Upcoming Trips</h2>
                  
                  <Link 
                    to="/bookings" 
                    className="text-sm text-secondary-600 hover:text-secondary-700 flex items-center"
                  >
                    <span>View all</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
                
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map(booking => {
                      const listing = getListingById(booking.listingId);
                      if (!listing) return null;
                      
                      return (
                        <div key={booking.id} className="flex border border-neutral-200 rounded-xl overflow-hidden">
                          <div className="w-24 h-24 flex-shrink-0">
                            <img 
                              src={listing.images[0]} 
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 p-4">
                            <h3 className="font-medium mb-1">{listing.title}</h3>
                            <div className="text-sm text-neutral-600 mb-1">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                booking.status === 'confirmed' 
                                  ? 'bg-success-100 text-success-900' 
                                  : 'bg-warning-100 text-warning-900'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                              <span className="text-sm text-neutral-500">
                                {listing.location.city}, {listing.location.country}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-neutral-500 mb-4">You don't have any upcoming trips</p>
                    <Link 
                      to="/search"
                      className="inline-block px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                    >
                      Find Places to Stay
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Saved Listings */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Saved Listings</h2>
                  
                  <Link 
                    to="/saved" 
                    className="text-sm text-secondary-600 hover:text-secondary-700 flex items-center"
                  >
                    <span>View all</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
                
                {user.savedListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.savedListings.slice(0, 4).map(id => {
                      const listing = getListingById(id);
                      if (!listing) return null;
                      
                      return (
                        <Link 
                          key={id} 
                          to={`/listings/${id}`} 
                          className="flex border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-colors"
                        >
                          <div className="w-24 h-24 flex-shrink-0">
                            <img 
                              src={listing.images[0]} 
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 p-3">
                            <h3 className="font-medium text-sm mb-1 line-clamp-1">{listing.title}</h3>
                            <div className="text-xs text-neutral-600 mb-1">
                              {listing.location.city}, {listing.location.country}
                            </div>
                            <div className="text-sm font-medium">
                              {listing.currency} {listing.price} / night
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-neutral-500 mb-4">You haven't saved any listings yet</p>
                    <Link 
                      to="/search"
                      className="inline-block px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                    >
                      Browse Listings
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        defaultValue={user.name}
                        className="w-full p-2 border border-neutral-300 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        defaultValue={user.email}
                        className="w-full p-2 border border-neutral-300 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        placeholder="Add your phone number"
                        className="w-full p-2 border border-neutral-300 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Profile Photo
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-100 overflow-hidden">
                          {user.image ? (
                            <img 
                              src={user.image} 
                              alt={user.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary-100 text-secondary-500 font-semibold">
                              {user.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        
                        <button className="text-sm text-secondary-600 hover:text-secondary-700">
                          Change Photo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-lg font-medium mb-4">Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Current Password
                      </label>
                      <input 
                        type="password" 
                        placeholder="Enter current password"
                        className="w-full p-2 border border-neutral-300 rounded-lg"
                      />
                    </div>
                    
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          New Password
                        </label>
                        <input 
                          type="password" 
                          placeholder="Enter new password"
                          className="w-full p-2 border border-neutral-300 rounded-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Confirm New Password
                        </label>
                        <input 
                          type="password" 
                          placeholder="Confirm new password"
                          className="w-full p-2 border border-neutral-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-lg font-medium mb-4">Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="email-notifications" 
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="email-notifications">
                        Email Notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="newsletter" 
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="newsletter">
                        Subscribe to newsletter
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;