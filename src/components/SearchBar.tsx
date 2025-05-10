import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchParams } from '../types';

interface SearchBarProps {
  className?: string;
  isCompact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', isCompact = false }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
  });
  
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchParams.location) {
      queryParams.append('location', searchParams.location);
    }
    
    if (searchParams.checkIn) {
      queryParams.append('checkIn', searchParams.checkIn.toISOString());
    }
    
    if (searchParams.checkOut) {
      queryParams.append('checkOut', searchParams.checkOut.toISOString());
    }
    
    if (searchParams.guests) {
      queryParams.append('guests', searchParams.guests.toString());
    }
    
    navigate(`/search?${queryParams.toString()}`);
  };
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (isCompact) {
    return (
      <div className={`relative ${className}`}>
        <button 
          className="flex items-center gap-2 w-full md:w-auto px-4 py-3 rounded-full border border-neutral-300 bg-white shadow-soft hover:shadow-medium transition-all"
          onClick={toggleOpen}
        >
          <Search size={18} className="text-neutral-500" />
          <span className="text-neutral-800">Where are you going?</span>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-medium z-20 animate-fade-in">
            <form onSubmit={handleSearch} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      value={searchParams.location}
                      onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                      placeholder="Where are you going?"
                      className="pl-10 w-full p-2 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Check in</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                      <DatePicker
                        selected={searchParams.checkIn}
                        onChange={(date) => setSearchParams({...searchParams, checkIn: date})}
                        selectsStart
                        startDate={searchParams.checkIn}
                        endDate={searchParams.checkOut}
                        minDate={new Date()}
                        placeholderText="Add dates"
                        className="pl-10 w-full p-2 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Check out</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                      <DatePicker
                        selected={searchParams.checkOut}
                        onChange={(date) => setSearchParams({...searchParams, checkOut: date})}
                        selectsEnd
                        startDate={searchParams.checkIn}
                        endDate={searchParams.checkOut}
                        minDate={searchParams.checkIn || new Date()}
                        placeholderText="Add dates"
                        className="pl-10 w-full p-2 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Guests</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                    <select
                      value={searchParams.guests}
                      onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
                      className="pl-10 w-full p-2 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} guest{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button 
                  type="submit"
                  className="w-full py-3 px-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-2xl transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-medium p-6 ${className}`}>
      <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchParams.location}
              onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
              placeholder="Where are you going?"
              className="pl-10 w-full p-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Check in</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
            <DatePicker
              selected={searchParams.checkIn}
              onChange={(date) => setSearchParams({...searchParams, checkIn: date})}
              selectsStart
              startDate={searchParams.checkIn}
              endDate={searchParams.checkOut}
              minDate={new Date()}
              placeholderText="Add dates"
              className="pl-10 w-full p-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Check out</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
            <DatePicker
              selected={searchParams.checkOut}
              onChange={(date) => setSearchParams({...searchParams, checkOut: date})}
              selectsEnd
              startDate={searchParams.checkIn}
              endDate={searchParams.checkOut}
              minDate={searchParams.checkIn || new Date()}
              placeholderText="Add dates"
              className="pl-10 w-full p-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
        </div>
        
        <div className="w-full md:w-32">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Guests</label>
          <div className="relative">
            <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
            <select
              value={searchParams.guests}
              onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
              className="pl-10 w-full p-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} guest{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="md:pl-4">
          <button 
            type="submit"
            className="w-full py-3 px-6 bg-secondary-500 hover:bg-secondary-600 text-white rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;