import { baseImageUrl } from '../constant'
import { motion } from 'framer-motion';
import { Play } from 'lucide-react'
import { useGetPopularMovieQuery } from '../api/movieSlice';
import { useState } from 'react';
import WatchNowModal from './WatchNowModal';


const FeaturedMovies = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const {
        data: popularMovies,
        isLoading,
        error
    } = useGetPopularMovieQuery();
    
    const featuredMovie = popularMovies?.results?.[10];

    const handleWatchNow = () => {
        console.log('Watch Now clicked!'); // Debug log
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log('Closing modal'); // Debug log
        setIsModalOpen(false);
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="relative h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                    <p className="mt-4 text-text-secondary">Loading featured movie...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="relative h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400">Error loading featured movie</p>
                </div>
            </div>
        );
    }

    // Show fallback if no movie data
    if (!featuredMovie) {
        return (
            <div className="relative h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-text-secondary">No featured movie available</p>
                </div>
            </div>
        );
    }
    
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative h-[70vh]"
            >
                <img
                    src={`${baseImageUrl}${featuredMovie?.poster_path}`}
                    alt={featuredMovie?.title}
                    className="w-full h-full absolute inset-0 object-contain"
                    style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 hero-gradient" />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-10 lg:left-10 left-0 p-8 max-w-2xl glass-container"
                >
                    <h1 className="text-4xl font-bold mb-4 gradient-text">{featuredMovie?.title}</h1>
                    <p className="text-lg mb-6">{featuredMovie?.overview}</p>
                    <div className="flex space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWatchNow}
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

            <WatchNowModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                movie={featuredMovie}
            />
        </>
    )
}

export default FeaturedMovies