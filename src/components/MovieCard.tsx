import React from 'react';
import { Star, Plus, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
	title: string;
	posterUrl: string;
	year: string;
	rating: number;
	genres: string[];
	movieId?: number; // Add movieId prop for navigation
}

const MovieCard: React.FC<MovieCardProps> = ({
	title,
	posterUrl,
	year,
	rating,
	genres,
	movieId = 1487983, // Default to sample movie ID
}) => {
	const navigate = useNavigate();

	const handleDetailsClick = () => {
		navigate(`/movie/${movieId}`);
	};

	const handleWatchlistClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent navigation when clicking watchlist
		// Add to watchlist logic here
		console.log('Added to watchlist:', title);
	};

	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			className="movie-card"
		>
			<img src={posterUrl} alt={title} className="w-full aspect-[2/3] rounded-lg" />
			<div className="movie-card-overlay rounded-lg">
				<h3 className="text-lg font-semibold">{title}</h3>
				<div className="flex items-center space-x-2 mt-1">
					<span className="text-sm">{year}</span>
					<span className="text-sm flex items-center">
						<Star className="w-4 h-4 text-yellow-400 mr-1" />
						{rating}
					</span>
				</div>
				<div className="flex flex-wrap gap-2 mt-2">
					{genres.map((genre) => (
						<span
							key={genre}
							className="text-xs px-2 py-1 bg-white/20 rounded-full"
						>
							{genre}
						</span>
					))}
				</div>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={handleWatchlistClick}
					className="mt-4 w-full flex items-center justify-center primary-button">
					<Plus className="w-4 h-4" />
					<span className='text-sm'>Watchlist</span>
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={handleDetailsClick}
					className="mt-2 w-full flex items-center justify-center secondary-button">
					<Eye className="w-4 h-4 mx-1" />
					<span className='text-sm'>Details</span>
				</motion.button>
			</div>
		</motion.div>
	);
};

export default MovieCard;