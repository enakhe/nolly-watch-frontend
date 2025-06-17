import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  Plus, 
  Share2,
  Heart,
  BookmarkPlus,
  Globe
} from 'lucide-react';
import { baseImageUrl } from '../constant';

// Mock movie data based on your sample - in a real app, you'd fetch this from your API
const mockMovieData = {
  "adult": false,
  "backdrop_path": "/woKtSTQd119qPPOnBdVeSAu2Pf7.jpg",
  "genre_ids": [18, 53],
  "id": 1487983,
  "original_language": "en",
  "original_title": "The Fire And The Moth",
  "overview": "Violence and mayhem ensue after a smuggler escapes with a rare Ife bronze head into a gritty western Nigerian town.",
  "popularity": 8.4785,
  "poster_path": "/hlE1jvehb0DYmLl2jxOeKuaE7lc.jpg",
  "release_date": "2025-05-16",
  "title": "The Fire And The Moth",
  "video": false,
  "vote_average": 5,
  "vote_count": 2,
  // Additional mock data for a complete movie details page
  "runtime": 128,
  "budget": 2500000,
  "revenue": 8750000,
  "tagline": "Some treasures are worth dying for",
  "homepage": "https://example.com/fire-and-moth",
  "production_companies": [
    { "name": "Nollywood Studios", "logo_path": null },
    { "name": "Lagos Film Productions", "logo_path": null }
  ],
  "production_countries": [
    { "name": "Nigeria", "iso_3166_1": "NG" }
  ],
  "spoken_languages": [
    { "name": "English", "iso_639_1": "en" },
    { "name": "Yoruba", "iso_639_1": "yo" }
  ],
  "cast": [
    {
      "name": "Adunni Ade",
      "character": "Kemi",
      "profile_path": "/sample-actor1.jpg"
    },
    {
      "name": "Ramsey Nouah",
      "character": "Chief Balogun",
      "profile_path": "/sample-actor2.jpg"
    },
    {
      "name": "Funke Akindele",
      "character": "Mama Sidi",
      "profile_path": "/sample-actor3.jpg"
    }
  ],
  "crew": [
    {
      "name": "Kunle Afolayan",
      "job": "Director",
      "profile_path": "/sample-director.jpg"
    },
    {
      "name": "Tunde Kelani",
      "job": "Producer",
      "profile_path": "/sample-producer.jpg"
    }
  ]
};

// Genre mapping
const genreMap: { [key: number]: string } = {
  18: 'Drama',
  53: 'Thriller',
  28: 'Action',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you'd fetch movie data based on the ID
  const movie = mockMovieData;
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map(id => genreMap[id]).filter(Boolean);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={`${baseImageUrl}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleGoBack}
          className="absolute top-8 left-8 flex items-center space-x-2 glass px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        {/* Movie Title Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-8 left-8 right-8"
        >
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4 gradient-text">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-xl text-text-secondary italic mb-4">"{movie.tagline}"</p>
            )}
            <div className="flex flex-wrap items-center gap-6 text-text-secondary">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="ml-1">({movie.vote_count} votes)</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                <span>{movie.original_language.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Poster and Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <img
                src={`${baseImageUrl}${movie.poster_path}`}
                alt={movie.title}
                className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl mb-8"
              />
              
              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full primary-button flex items-center justify-center py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Trailer
                </motion.button>
                
                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="secondary-button flex items-center justify-center py-3"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="secondary-button flex items-center justify-center py-3"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="secondary-button flex items-center justify-center py-3"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Movie Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            
            {/* Genres */}
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                {getGenreNames(movie.genre_ids).map((genre) => (
                  <span
                    key={genre}
                    className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-text-secondary leading-relaxed text-lg">{movie.overview}</p>
            </div>

            {/* Movie Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-container">
                <h3 className="text-lg font-semibold mb-4">Movie Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Release Date</span>
                    <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Runtime</span>
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Language</span>
                    <span>{movie.original_language.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Popularity</span>
                    <span>{movie.popularity.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="glass-container">
                <h3 className="text-lg font-semibold mb-4">Box Office</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Budget</span>
                    <span>{formatCurrency(movie.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Revenue</span>
                    <span>{formatCurrency(movie.revenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Profit</span>
                    <span className="text-green-400">
                      {formatCurrency(movie.revenue - movie.budget)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cast */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {movie.cast.map((actor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold">{actor.name}</h4>
                    <p className="text-text-secondary text-sm">{actor.character}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Crew */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Crew</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.crew.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center space-x-4 glass-container"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-text-secondary text-sm">{member.job}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Production Info */}
            <div className="glass-container">
              <h2 className="text-2xl font-bold mb-6">Production</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Production Companies</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_companies.map((company, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Countries</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_countries.map((country, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {country.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.spoken_languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {language.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;