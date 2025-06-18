import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Star, Calendar, Users } from 'lucide-react';
import { SingleMovieResponse, baseImageUrl } from '../constant';
import { useGetMoviesVideoQuery } from '../api/movieSlice';

interface WatchNowModalProps {
	isOpen: boolean;
	onClose: () => void;
	movie: SingleMovieResponse | undefined;
}

const WatchNowModal: React.FC<WatchNowModalProps> = ({ isOpen, onClose, movie }) => {

	console.log('Modal render:', { isOpen, movie: movie?.title }); // Debug log

	const {
		data: videoData,
	} = useGetMoviesVideoQuery({
		movieId: movie?.id ?? 0
	});

	if (!movie) {
		console.log('No movie data available');
		return null;
	}

	// Mock trailer URL - in a real app, you'd get this from your API
	const trailerUrl = `https://www.youtube.com/embed/${videoData?.results?.[0]?.key || 'dQw4w9WgXcQ'}?autoplay=1&mute=1&controls=1`;
	const teaserUrl = `https://www.youtube.com/watch/${videoData?.results?.[1]?.key || 'dQw4w9WgXcQ'}`;

	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 }
	};

	const modalVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			y: 50
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 300
			}
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			y: 50,
			transition: {
				duration: 0.2
			}
		}
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleCloseClick = () => {
		console.log('Close button clicked');
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
					onClick={handleBackdropClick}
				>
					<motion.div
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl glass shadow-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={handleCloseClick}
							className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
							title="Close"
							aria-label="Close"
						>
							<X className="w-6 h-6 text-white" />
						</button>

						{/* Modal Content */}
						<div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
							{/* Trailer Section */}
							<div className="lg:w-2/3 relative">
								<div className="aspect-video bg-black rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden">
									<iframe
										src={trailerUrl}
										title={`${movie.title} Trailer`}
										className="w-full h-full"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>

									<iframe
										src={teaserUrl}
										title={`${movie.title} Teaser`}
										className="w-full h-full"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>

								{/* Gradient Overlay for Mobile */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

								{/* Mobile Title Overlay */}
								<div className="absolute bottom-4 left-4 lg:hidden">
									<h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
									<div className="flex items-center space-x-4 text-white/80">
										<div className="flex items-center">
											<Star className="w-4 h-4 text-yellow-400 mr-1" />
											<span>{movie.vote_average.toFixed(1)}</span>
										</div>
										<div className="flex items-center">
											<Calendar className="w-4 h-4 mr-1" />
											<span>{new Date(movie.release_date).getFullYear()}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Movie Info Section */}
							<div className="lg:w-1/3 p-6 overflow-y-auto">
								{/* Desktop Title */}
								<div className="hidden lg:block mb-6">
									<h2 className="text-2xl font-bold mb-3">{movie.title}</h2>
									<div className="flex flex-wrap gap-4 text-text-secondary mb-4">
										<div className="flex items-center">
											<Star className="w-4 h-4 text-yellow-400 mr-1" />
											<span>{movie.vote_average.toFixed(1)}/10</span>
										</div>
										<div className="flex items-center">
											<Calendar className="w-4 h-4 mr-1" />
											<span>{new Date(movie.release_date).getFullYear()}</span>
										</div>
										<div className="flex items-center">
											<Users className="w-4 h-4 mr-1" />
											<span>{movie.vote_count.toLocaleString()} votes</span>
										</div>
									</div>
								</div>

								{/* Movie Poster */}
								<div className="mb-6">
									<img
										src={`${baseImageUrl}${movie.poster_path}`}
										alt={movie.title}
										className="w-32 h-48 object-cover rounded-lg mx-auto lg:mx-0 shadow-lg"
									/>
								</div>
							</div>
						</div>
						<div className="p-6 space-y-6">
							{/* Overview */}
							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-3">Overview</h3>
								<p className="text-text-secondary leading-relaxed">{movie.overview}</p>
							</div>

							{/* Additional Info */}
							<div className="space-y-4">
								<div>
									<h4 className="font-semibold mb-2">Release Date</h4>
									<p className="text-text-secondary">
										{new Date(movie.release_date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</p>
								</div>

								<div>
									<h4 className="font-semibold mb-2">Popularity Score</h4>
									<p className="text-text-secondary">{movie.popularity.toFixed(0)}</p>
								</div>

								<div>
									<h4 className="font-semibold mb-2">Language</h4>
									<p className="text-text-secondary uppercase">{movie.original_language}</p>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="mt-8 space-y-3">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="w-full primary-button flex items-center justify-center"
								>
									<Play className="w-5 h-5 mr-2" />
									Watch Full Movie
								</motion.button>

								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="w-full secondary-button"
								>
									Add to Watchlist
								</motion.button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default WatchNowModal;