import { baseImageUrl } from '../constant'
import { motion } from 'framer-motion';
import { Play } from 'lucide-react'
import { useGetPopularMovieQuery } from '../api/movieSlice';


const FeaturedMovies = () => {
    
    const {
        data: popularMovies,
    } = useGetPopularMovieQuery();
    
    const featuredMovie = popularMovies?.results[10];
    
    return (
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
    )
}

export default FeaturedMovies