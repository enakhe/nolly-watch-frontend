import React from 'react';
import { Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface MovieCardProps {
	title: string;
	posterUrl: string;
	year: string;
	rating: number;
	genres: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({
	title,
	posterUrl,
	year,
	rating,
	genres,
}) => {

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
					className="mt-4 w-full flex items-center justify-center primary-button">
					<Plus className="w-4 h-4" />
					<span className='text-sm'>Add to Watchlist</span>
				</motion.button>
			</div>
		</motion.div>
	);
};

export default MovieCard;