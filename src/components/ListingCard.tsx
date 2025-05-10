import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../types';
import { Star, Heart } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ 
  listing, 
  isSaved = false,
  onToggleSave 
}) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onToggleSave) {
      onToggleSave(listing.id);
    }
  };

  return (
    <Link 
      to={`/listings/${listing.id}`} 
      className="group block rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-medium"
    >
      <div className="relative">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="h-64 w-full object-cover transition-transform group-hover:scale-105"
        />
        
        {onToggleSave && (
          <button 
            onClick={handleSaveClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-soft hover:shadow-medium transition-all"
            aria-label={isSaved ? "Remove from saved" : "Save this listing"}
          >
            <Heart 
              size={18} 
              className={`${isSaved ? 'fill-error-500 text-error-500' : 'text-neutral-500'}`} 
            />
          </button>
        )}
        
        {listing.host.superhost && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-white text-xs font-medium text-neutral-800 rounded-full shadow-soft">
            Superhost
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-neutral-900 mb-1 line-clamp-1">{listing.title}</h3>
            <p className="text-neutral-500 text-sm mb-2">{listing.location.city}, {listing.location.country}</p>
          </div>
          
          <div className="flex items-center gap-1">
            <Star size={16} className="text-accent-500 fill-accent-500" />
            <span className="text-sm font-medium">{listing.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="font-semibold">{listing.currency} {listing.price}</span>
          <span className="text-neutral-500">/ night</span>
        </div>
        
        <div className="mt-2 text-xs text-neutral-500 flex flex-wrap gap-1">
          <span>{listing.beds} bed{listing.beds !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span>{listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span>Up to {listing.maxGuests} guests</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;