import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetActorsQuery, useGetMovieGenresQuery } from '../api/movieSlice';
import { Actor, baseImageUrl } from '../constant';
import { useEffect, useState } from 'react';
import NowPlaying from '../components/NowPlaying';
import FeaturedMovies from '../components/FeaturedMovies';
import PopularMovies from '../components/PopularMovies';
import PopularTvShows from '../components/PopularTvShows';
import UpcomingMovies from '../components/UpcomingMovies';

const Home = () => {

	const [celebrities, setCelebrities] = useState<Actor[]>([]);
	const [actorStep, setActorStep] = useState(1);

	const {
		data: genreData,
	} = useGetMovieGenresQuery();

	const {
		data: actorData,
		isFetching
	} = useGetActorsQuery({
		pageNumber: actorStep
	});

	useEffect(() => {
		if (actorData?.results) {
			setCelebrities((prevCelebrities) => {
				const newCelebrities = actorData.results.filter(
					(actor) => !prevCelebrities.some((prev) => prev.id === actor.id)
				);
				return [...prevCelebrities, ...newCelebrities];
			});
		}
	}, [actorData]);

	const handleNextPage = () => {
		if (actorStep < (actorData?.total_pages || 1)) {
			setActorStep((prevStep) => prevStep + 1);
		}
	};

	const handlePreviousPage = () => {
		if (actorStep > 1) {
			setActorStep((prevStep) => prevStep - 1);
		}
	};


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

			<FeaturedMovies />

			<NowPlaying genres={genreData?.genres} />

			<PopularMovies genres={genreData?.genres} />

			<PopularTvShows genres={genreData?.genres} />

			<UpcomingMovies genres={genreData?.genres} />

			{/* Most Popular Celebrities */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center">
						<div className="w-1 h-8 bg-primary mr-4" />
						<h2 className="text-2xl font-bold">Most Popular Celebrities</h2>
					</div>
					<div className="flex items-center space-x-4">
						<button
							className="p-2 rounded-full hover:bg-white/10 transition-colors"
							title="Previous"
							onClick={handlePreviousPage}
							disabled={actorStep === 1 || isFetching}>
							<ChevronLeft className="w-6 h-6" />
						</button>
						<button
							className="p-2 rounded-full hover:bg-white/10 transition-colors"
							title="Next"
							onClick={handleNextPage}
							disabled={actorStep >= (actorData?.total_pages || 1) || isFetching}>
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
					{celebrities?.map((celebrity, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className="glass-container hover-card"
						>
							<div className="relative mb-4">
								<img
									src={`${baseImageUrl}${celebrity?.profile_path}`}
									alt={celebrity.name}
									className="w-full h-48 object-cover rounded-lg"
								/>
								<div className="absolute top-2 left-2 bg-black/50 rounded-full px-3 py-1 text-sm">
									#{celebrity.popularity}
								</div>
							</div>
							<h3 className="text-lg font-semibold mb-2">{celebrity.name}</h3>
							<div className="flex items-center text-text-secondary">
								<Star className="w-4 h-4 text-primary mr-1" />
								{celebrity.popularity.toLocaleString()}
							</div>
						</motion.div>
					))}
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