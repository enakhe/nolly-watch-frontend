import { Play, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import { useGetActorsQuery, useGetMovieGenresQuery, useGetMoviesWithFilteringQuery, useGetPopularMovieQuery } from '../api/movieSlice';
import { Actor, baseImageUrl, Genre, Movie } from '../constant';
import { useEffect, useState } from 'react';

const Home = () => {

	const [movies, setMovies] = useState<Movie[]>([]);
	const [celebrities, setCelebrities] = useState<Actor[]>([]);
	const [actorStep, setActorStep] = useState(1);
	const [moviesPage, setMoviesPage] = useState(1);

	const {
		data: popularMovies,
	} = useGetPopularMovieQuery();

	const {
		data: moviesData,
	} = useGetMoviesWithFilteringQuery({
		pageNumber: moviesPage
	});

	const {
		data: genreData,
	} = useGetMovieGenresQuery();

	const {
		data: actorData,
		isFetching
	} = useGetActorsQuery({
		pageNumber: actorStep
	});

	const featuredMovie = popularMovies?.results[10];

	useEffect(() => {
		if (moviesData?.results) {
			setMovies((prevMovies) => [...prevMovies, ...moviesData.results]);
		}
	}, [moviesData]);

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

	function mapMovieGenres(movie: Movie, genres: Genre[]): string[] {
		return movie.genre_ids
			.map(genreId => {
				const genre = genres.find(g => g.id === genreId);
				return genre ? genre.name : null;
			})
			.filter((name): name is string => name !== null);
	}

	return (
		<div className="pt-16">
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="relative h-[70vh]"
			>
				<img
					src={`${baseImageUrl}${featuredMovie?.poster_path}`}
					alt={featuredMovie?.title}
					className="w-full h-full object-cover"
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

			{/* Popular Movies */}
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
									genres={mapMovieGenres(movie, genreData?.genres || [])}
									year={movie.release_date}
									rating={movie.popularity}
									key={index} />
							</motion.div>
						))}
					</div>
				</motion.div>
				<div className='flex my-8 justify-center items-center'>
					<button className="primary-button pulsing" onClick={() => setMoviesPage((prevPage) => prevPage + 1)}>
						Load more
					</button>
				</div>
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