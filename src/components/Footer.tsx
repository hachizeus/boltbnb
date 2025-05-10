import React from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-50 pt-12 pb-8 border-t border-primary-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <BedDouble className="h-6 w-6 text-secondary-500" />
              <span className="text-lg font-bold font-heading text-primary-800">StayScape</span>
            </Link>
            <p className="text-neutral-600 mb-4">
              Find your perfect stay with confidence and comfort. Discover amazing accommodations worldwide.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-neutral-500 hover:text-secondary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-secondary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-secondary-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-primary-800 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-primary-800 font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Safety Information
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-primary-800 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie" className="text-neutral-600 hover:text-secondary-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-100 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} StayScape. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <select className="bg-white border border-neutral-200 text-neutral-700 py-1 px-2 rounded-md text-sm">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;