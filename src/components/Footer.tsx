import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">NOLLYWATCH</h2>
            <p className="text-text-secondary">© 2025 NollyWatch. All Rights Reserved.</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-text-secondary hover:text-primary">Home</Link></li>
              <li><Link to="/movies" className="text-text-secondary hover:text-primary">Movies</Link></li>
              <li><Link to="/tv-shows" className="text-text-secondary hover:text-primary">TV Shows</Link></li>
              <li><Link to="/awards" className="text-text-secondary hover:text-primary">Awards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" className="text-text-secondary hover:text-primary">Facebook</a></li>
              <li><a href="https://instagram.com" className="text-text-secondary hover:text-primary">Instagram</a></li>
              <li><a href="https://twitter.com" className="text-text-secondary hover:text-primary">Twitter</a></li>
              <li><a href="https://pinterest.com" className="text-text-secondary hover:text-primary">Pinterest</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact us</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>Email: support@nollywatch.com</li>
              <li>Phone: +1 (800) 123-4567</li>
              <li>Address: 123 Timepiece Lane, WatchVille, CA, USA</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;