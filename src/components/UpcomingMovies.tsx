import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { baseImageUrl, Genre, mapMovieGenres, Movie } from '../constant';
import { useGetUpcomingMoviesQuery } from '../api/movieSlice';
import MovieCard from './MovieCard';

interface GenreDataProp {
    genres: Genre[] | undefined;
}

const UpcomingMovies = ({ genres }: GenreDataProp) => {
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [upcomingMoviesPage, setUpcomingMoviesPage] = useState(1);

    const {
        data: upcomingMoviesData,
    } = useGetUpcomingMoviesQuery({
        pageNumber: upcomingMoviesPage
    });

    React.useEffect(() => {
        if (upcomingMoviesData?.results) {
            setUpcomingMovies((prevMovies) => [...prevMovies, ...upcomingMoviesData.results]);
        }
    }, [upcomingMoviesData]);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-6 section-title">Upcoming Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {upcomingMovies?.map((movie, index) => (
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
                                key={index} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <div className='flex my-8 justify-center items-center'>
                <button
                    type="button"
                    className="primary-button pulsing"
                    onClick={() => setUpcomingMoviesPage((prevPage) => prevPage + 1)}
                >
                    Load more
                </button>
            </div>
        </section>
    )
}

export default UpcomingMovies