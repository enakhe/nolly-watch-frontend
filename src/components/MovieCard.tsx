import React, { useState } from 'react';
import { Star, Plus, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useGetWatchlistsQuery, useCreateWatchlistMutation, useAddToWatchlistMutation } from '../api/userSlice';

interface MovieCardProps {
	title: string;
	posterUrl: string;
	year: string;
	rating: number;
	genres: string[];
	movieId?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
	title,
	posterUrl,
	year,
	rating,
	genres,
	movieId = 1487983,
}) => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const [showWatchlistModal, setShowWatchlistModal] = useState(false);

	const { data: watchlistsData } = useGetWatchlistsQuery(undefined, {
		skip: !isAuthenticated,
	});

	const [createWatchlist] = useCreateWatchlistMutation();
	const [addToWatchlist] = useAddToWatchlistMutation();

	const handleDetailsClick = () => {
		navigate(`/movie/${movieId}`);
	};

	const handleWatchlistClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		
		if (!isAuthenticated) {
			navigate('/signin');
			return;
		}

		setShowWatchlistModal(true);
	};

	const handleAddToWatchlist = async (watchlistId: string) => {
		try {
			await addToWatchlist({ watchlistId, movieId }).unwrap();
			setShowWatchlistModal(false);
			// You could add a toast notification here
		} catch (error) {
			console.error('Failed to add to watchlist:', error);
		}
	};

	const handleCreateAndAddToWatchlist = async () => {
		try {
			const newWatchlist = await createWatchlist({
				name: 'My Watchlist',
				description: 'Default watchlist'
			}).unwrap();
			
			await addToWatchlist({ 
				watchlistId: newWatchlist.watchlist._id, 
				movieId 
			}).unwrap();
			
			setShowWatchlistModal(false);
		} catch (error) {
			console.error('Failed to create watchlist and add movie:', error);
		}
	};

	return (
		<>
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

			{/* Watchlist Modal */}
			{showWatchlistModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
					<div className="bg-background glass rounded-lg p-6 w-full max-w-md">
						<h3 className="text-xl font-bold mb-4">Add to Watchlist</h3>
						
						{watchlistsData?.watchlists && watchlistsData.watchlists.length > 0 ? (
							<div className="space-y-2 mb-4">
								{watchlistsData.watchlists.map((watchlist) => (
									<button
										key={watchlist._id}
										onClick={() => handleAddToWatchlist(watchlist._id)}
										className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors"
									>
										<div className="font-medium">{watchlist.name}</div>
										{watchlist.description && (
											<div className="text-sm text-text-secondary">{watchlist.description}</div>
										)}
									</button>
								))}
							</div>
						) : (
							<div className="mb-4">
								<p className="text-text-secondary mb-4">You don't have any watchlists yet.</p>
								<button
									onClick={handleCreateAndAddToWatchlist}
									className="w-full primary-button"
								>
									Create Watchlist & Add Movie
								</button>
							</div>
						)}

						<div className="flex space-x-3">
							<button
								onClick={() => setShowWatchlistModal(false)}
								className="flex-1 secondary-button"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MovieCard;