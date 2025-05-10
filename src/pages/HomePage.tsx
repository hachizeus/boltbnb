import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Star } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ListingGrid from '../components/ListingGrid';
import { getFeaturedListings } from '../data/listings';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const featuredListings = getFeaturedListings();
  const { user, isAuthenticated } = useAuth();
  
  const handleToggleSave = (id: string) => {
    if (!isAuthenticated) {
      toast.error('Please log in to save listings');
      return;
    }
    
    // This would connect to the backend in a real app
    toast.success('Listing saved successfully');
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative pt-20 pb-32 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
              Find Your Perfect Stay Anywhere in the World
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover beautiful vacation homes, unique experiences, and unforgettable stays
            </p>
          </div>
          
          <SearchBar className="max-w-4xl mx-auto" />
        </div>
      </section>
      
      {/* Featured Listings Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 font-heading">
              Featured Places to Stay
            </h2>
            <Link 
              to="/search"
              className="text-secondary-600 hover:text-secondary-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          <ListingGrid 
            listings={featuredListings}
            onToggleSave={handleToggleSave}
          />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 px-6 bg-primary-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-10 font-heading">
            Explore by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/search?type=beachfront" className="group">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg" 
                  alt="Beachfront property"
                  className="aspect-[1/1] object-cover w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-semibold">Beachfront</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/search?type=cabins" className="group">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg" 
                  alt="Cabin property"
                  className="aspect-[1/1] object-cover w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-semibold">Cabins</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/search?type=luxury" className="group">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg" 
                  alt="Luxury property"
                  className="aspect-[1/1] object-cover w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-semibold">Luxury</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/search?type=countryside" className="group">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2132008/pexels-photo-2132008.jpeg" 
                  alt="Countryside property"
                  className="aspect-[1/1] object-cover w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-semibold">Countryside</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-10 text-center font-heading">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-secondary-100 p-4 rounded-full mb-4">
                <MapPin size={28} className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-800">Find the Perfect Location</h3>
              <p className="text-neutral-600">
                Search from thousands of listings in any city or destination around the world.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-secondary-100 p-4 rounded-full mb-4">
                <Calendar size={28} className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-800">Book Your Stay</h3>
              <p className="text-neutral-600">
                Choose your dates, select your preferred accommodation, and secure your booking.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-secondary-100 p-4 rounded-full mb-4">
                <Star size={28} className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-800">Enjoy Your Experience</h3>
              <p className="text-neutral-600">
                Experience a memorable stay and share your feedback to help our community grow.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-secondary-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-10 text-center font-heading">
            What Our Guests Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-soft">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                  alt="Guest" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael Thompson</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-accent-500 fill-accent-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "Amazing experience! The apartment was exactly as pictured and the host was incredibly helpful. The location was perfect for exploring the city."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-soft">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                  alt="Guest" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-accent-500 fill-accent-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "The villa exceeded our expectations! Spacious, clean, and with an incredible view. The private pool was a highlight of our stay."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-soft">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" 
                  alt="Guest" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">David Chen</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < 4 ? "text-accent-500 fill-accent-500" : "text-neutral-300"} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "Great value for the price. The cabin was cozy and comfortable. Perfect for our weekend getaway. Would definitely book again!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have found their ideal accommodations through StayScape.
          </p>
          <Link 
            to="/search"
            className="inline-block px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-2xl transition-colors font-medium text-lg"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;