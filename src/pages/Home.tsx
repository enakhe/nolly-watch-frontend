import React from 'react';
import { Play, Star, TrendingUp, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const featuredMovie = {
    title: 'Interstellar',
    description:
      'Interstellar is a 2014 science fiction film directed by Christopher Nolan. Set in a dystopian future where Earth is plagued by environmental disasters, the story follows a group of astronauts led by former pilot Cooper (Matthew McConaughey), who embark on a daring mission through a newly discovered wormhole near Saturn.',
    posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcba9c5a98c',
    year: '2024',
    rating: 4.8,
    genres: ['Sci-Fi'],
  };

  const celebrities = [
    {
      name: 'Funke Akindele',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      rank: 1,
      change: 2,
      score: 9876,
    },
    {
      name: 'Richard Mofe-Damijo',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      rank: 2,
      change: -1,
      score: 9654,
    },
    {
      name: 'Genevieve Nnaji',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      rank: 3,
      change: 1,
      score: 9432,
    },
    {
      name: 'Ramsey Nouah',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      rank: 4,
      change: 0,
      score: 9210,
    },
  ];

  const movies = [
    {
      title: 'Lionheart',
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
      year: '2025',
      rating: 4.0,
      genres: ['Drama', 'Comedy'],
    },
    {
      title: 'Sugar Rush',
      posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcba9c5a98c',
      year: '2025',
      rating: 4.2,
      genres: ['Action', 'Comedy'],
    },
    {
      title: 'Oloture',
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
      year: '2025',
      rating: 4.5,
      genres: ['Drama', 'Thriller'],
    },
    {
      title: 'Alaagba',
      posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcba9c5a98c',
      year: '2025',
      rating: 4.1,
      genres: ['Drama', 'Mystery'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh]"
      >
        <img
          src={featuredMovie.posterUrl}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-0 left-0 p-8 max-w-2xl glass-container"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">{featuredMovie.title}</h1>
          <p className="text-lg mb-6">{featuredMovie.description}</p>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-button flex items-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-button"
            >
              More Info
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Most Popular Celebrities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-primary mr-4" />
            <h2 className="text-2xl font-bold">Most Popular Celebrities</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {celebrities.map((celebrity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-container hover-card"
            >
              <div className="relative mb-4">
                <img
                  src={celebrity.image}
                  alt={celebrity.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2 bg-black/50 rounded-full px-3 py-1 text-sm">
                  #{celebrity.rank}
                </div>
                <div className={`absolute top-2 right-2 flex items-center bg-black/50 rounded-full px-3 py-1 text-sm ${
                  celebrity.change > 0 ? 'text-green-400' : celebrity.change < 0 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {celebrity.change > 0 ? '+' : ''}{celebrity.change}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{celebrity.name}</h3>
              <div className="flex items-center text-text-secondary">
                <Star className="w-4 h-4 text-primary mr-1" />
                {celebrity.score.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Popular Movies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 section-title">Popular Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieCard {...movie} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-primary/20 to-primary/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="glass-container"
          >
            <h2 className="text-3xl font-bold mb-4">Find Your Next Watch on NollyWatch</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Discover the best of Nollywood - from classic hits to the latest releases.
              Start your journey today!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-button"
            >
              Start Watching
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;