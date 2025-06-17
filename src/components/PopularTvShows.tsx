import { useEffect, useState } from "react";
import { baseImageUrl, Genre, mapMovieGenres, Movie } from "../constant";
import { motion } from 'framer-motion';
import { useGetTvShowsWithFilteringQuery } from "../api/movieSlice";
import MovieCard from "./MovieCard";

interface GenreDataProp {
    genres: Genre[] | undefined;
}

const PopularTvShows = ({ genres }: GenreDataProp) => {
    const [tvShows, setTvShows] = useState<Movie[]>([]);
    const [tvShowsPage, setTvShowsPage] = useState(1);

    const {
        data: tvShowsData,
    } = useGetTvShowsWithFilteringQuery({
        pageNumber: tvShowsPage
    });

    useEffect(() => {
        if (tvShowsData?.results) {
            setTvShows((prevTvShows) => [...prevTvShows, ...tvShowsData.results]);
        }
    }, [tvShowsData]);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-6 section-title">Popular TV Shows</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {tvShows?.map((tvShow, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <MovieCard
                                title={tvShow.title}
                                posterUrl={`${baseImageUrl}${tvShow?.poster_path}`}
                                genres={mapMovieGenres(tvShow, genres || [])}
                                year={tvShow.release_date}
                                rating={tvShow.popularity}
                                key={index} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <div className='flex my-8 justify-center items-center'>
                <button className="primary-button pulsing" onClick={() => setTvShowsPage((prevPage) => prevPage + 1)}>
                    Load more
                </button>
            </div>
        </section>
    )
}

export default PopularTvShows