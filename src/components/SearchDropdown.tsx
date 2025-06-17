import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Movie, baseImageUrl } from '../constant';

interface SearchDropdownProps {
  isOpen: boolean;
  searchResults: Movie[];
  isLoading: boolean;
  searchQuery: string;
  onClose: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  isOpen,
  searchResults,
  isLoading,
  searchQuery,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    onClose();
  };

  const handleViewAllResults = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-0 right-0 mt-2 glass rounded-xl shadow-2xl border border-white/10 max-h-96 overflow-hidden z-50"
        >
          {isLoading ? (
            <div className="p-6 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-text-secondary">Searching movies...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {searchResults.slice(0, 5).map((movie, index) => (
                <motion.div
                  key={movie.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMovieClick(movie.id)}
                  className="flex items-center p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-b-0"
                >
                  <div className="flex-shrink-0 w-12 h-16 mr-4">
                    {movie.poster_path ? (
                      <img
                        src={`${baseImageUrl}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 rounded-md flex items-center justify-center">
                        <span className="text-xs text-text-secondary">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-white truncate mb-1">
                      {movie.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-text-secondary">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                    {movie.overview && (
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2 truncate">
                        {movie.overview.length > 80 
                          ? `${movie.overview.substring(0, 80)}...` 
                          : movie.overview
                        }
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {searchResults.length > 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 border-t border-white/10"
                >
                  <button
                    onClick={handleViewAllResults}
                    className="w-full text-center text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    View all {searchResults.length} results
                  </button>
                </motion.div>
              )}
            </div>
          ) : searchQuery.length > 0 ? (
            <div className="p-6 text-center">
              <p className="text-text-secondary">
                No movies found for "{searchQuery}"
              </p>
              <p className="text-sm text-text-secondary mt-2">
                Try searching with different keywords
              </p>
            </div>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDropdown;