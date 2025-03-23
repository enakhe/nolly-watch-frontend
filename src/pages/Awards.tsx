import React from 'react';

const Awards = () => {
  const awards = [
    {
      name: 'Africa Magic Viewers Choice Awards',
      date: 'May 15, 2025',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
      description: 'The premier awards ceremony celebrating excellence in African cinema and television.',
    },
    {
      name: 'Nigerian Entertainment Awards',
      date: 'June 30, 2025',
      location: 'Abuja, Nigeria',
      image: 'https://images.unsplash.com/photo-1518676590629-3dcba9c5a98c',
      description: 'Recognizing outstanding achievements in Nigerian entertainment industry.',
    },
    {
      name: 'Best of Nollywood Awards',
      date: 'August 20, 2025',
      location: 'Port Harcourt, Nigeria',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
      description: 'Celebrating the finest talents and productions in Nollywood.',
    },
  ];

  const categories = [
    'Upcoming Events',
    'Past Events',
    'Film Awards',
    'TV Awards',
    'Special Recognition',
  ];

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Awards & Events</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover and celebrate the most prestigious awards and events in the Nigerian film industry.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-background/50 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={award.image}
                alt={award.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{award.name}</h3>
                <div className="flex items-center gap-4 text-text-secondary mb-4">
                  <span>{award.date}</span>
                  <span>•</span>
                  <span>{award.location}</span>
                </div>
                <p className="text-text-secondary mb-6">{award.description}</p>
                <button className="primary-button w-full">Learn More</button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-background/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-text-secondary mb-6">
            Subscribe to our newsletter to receive updates about upcoming awards and events.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-white/20 focus:outline-none focus:border-primary"
            />
            <button className="primary-button">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;