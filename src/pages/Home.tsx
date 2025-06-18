import { useGetMovieGenresQuery } from '../api/movieSlice';
import NowPlaying from '../components/NowPlaying';
import { motion } from 'framer-motion';
import FeaturedMovies from '../components/FeaturedMovies';
import PopularMovies from '../components/PopularMovies';
import PopularTvShows from '../components/PopularTvShows';
import UpcomingMovies from '../components/UpcomingMovies';

const Home = () => {

	const {
		data: genreData,
	} = useGetMovieGenresQuery();

	return (
		<div className="pt-16">

			<FeaturedMovies />

			<NowPlaying genres={genreData?.genres} />

			<PopularMovies genres={genreData?.genres} />

			<PopularTvShows genres={genreData?.genres} />

			<UpcomingMovies genres={genreData?.genres} />

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
						className="glass-container">
						<h2 className="text-3xl font-bold mb-4">Find Your Next Watch on NollyWatch</h2>
						<p className="text-text-secondary mb-8 max-w-2xl mx-auto">
							Discover the best of Nollywood - from classic hits to the latest releases.
							Start your journey today!
						</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="primary-button">
							Start Watching
						</motion.button>
					</motion.div>
				</div>
			</motion.section>
		</div>
	);
};

export default Home;