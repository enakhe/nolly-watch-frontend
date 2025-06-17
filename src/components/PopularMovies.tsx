import { motion } from 'framer-motion';
import { baseImageUrl, Genre, mapMovieGenres, Movie } from '../constant';
import MovieCard from './MovieCard';
import { useGetMoviesWithFilteringQuery } from '../api/movieSlice';
import { useEffect, useState } from 'react';

// Declare a property for genre data
interface GenreDataProp {
    genres: Genre[] | undefined;
}

const PopularMovies = ({ genres }: GenreDataProp) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [moviesPage, setMoviesPage] = useState(1);

    const {
        data: moviesData,
    } = useGetMoviesWithFilteringQuery({
        pageNumber: moviesPage
    });

    useEffect(() => {
        if (moviesData?.results) {
            setMovies((prevMovies) => [...prevMovies, ...moviesData.results]);
        }
    }, [moviesData]);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-6 section-title">Popular Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies?.map((movie, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <MovieCard
                                title={movie.title}
                                posterUrl={`${baseImageUrl}${movie?.poster_path}`}
                                genres={mapMovieGenres(movie, genres || [])}
                                year={movie.release_date}
                                rating={movie.popularity}
                                movieId={movie.id}
                                key={index} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <div className='flex my-8 justify-center items-center'>
                <button
                    type="button"
                    className="primary-button pulsing"
                    onClick={() => setMoviesPage((prevPage) => prevPage + 1)}
                >
                    Load more
                </button>
            </div>
        </section>
    )
}

export default PopularMovies