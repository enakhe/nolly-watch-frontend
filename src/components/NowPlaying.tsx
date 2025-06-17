import { useEffect, useState } from 'react'
import { mapMovieGenres, Movie, baseImageUrl, Genre } from '../constant';
import { motion } from 'framer-motion';
import { useGetNowPlayingMoviesQuery } from '../api/movieSlice';
import MovieCard from './MovieCard';

interface GenreDataProp {
    genres: Genre[] | undefined;
}

const NowPlaying = ({ genres }: GenreDataProp) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const {
        data: nowPlayingMovies,
    } = useGetNowPlayingMoviesQuery();

    useEffect(() => {
        if (nowPlayingMovies?.results) {
            setMovies(nowPlayingMovies.results);
        }
    }, [nowPlayingMovies]);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-6 section-title">Now Playing</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
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
                                key={index} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default NowPlaying