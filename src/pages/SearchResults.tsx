import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import { useSearchMoviesQuery } from '../api/movieSlice';
import MovieCard from '../components/MovieCard';
import { baseImageUrl, mapMovieGenres } from '../constant';

const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const query = searchParams.get('q') || '';
	const [currentPage, setCurrentPage] = useState(1);
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [sortBy, setSortBy] = useState('popularity');

	const {
		data: searchResults,
		isLoading,
		error,
	} = useSearchMoviesQuery(
		{ query, page: currentPage },
		{ skip: !query }
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [query]);

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleLoadMore = () => {
		if (searchResults && currentPage < searchResults.total_pages) {
			setCurrentPage(prev => prev + 1);
		}
	};

	const sortedResults = React.useMemo(() => {
		if (!searchResults?.results) return [];

		const results = [...searchResults.results];

		switch (sortBy) {
			case 'title':
				return results.sort((a, b) => a.title.localeCompare(b.title));
			case 'release_date':
				return results.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
			case 'vote_average':
				return results.sort((a, b) => b.vote_average - a.vote_average);
			case 'popularity':
			default:
				return results.sort((a, b) => b.popularity - a.popularity);
		}
	}, [searchResults?.results, sortBy]);

	if (!query) {
		return (
			<div className="pt-16 min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">No search query provided</h1>
					<button onClick={handleGoBack} className="primary-button">
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="pt-16 min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<button
							onClick={handleGoBack}
							className="p-2 hover:bg-white/10 rounded-full transition-colors"
						>
							<ArrowLeft className="w-6 h-6" />
						</button>
						<div>
							<h1 className="text-2xl font-bold">
								Search Results for "{query}"
							</h1>
							{searchResults && (
								<p className="text-text-secondary">
									{searchResults.total_results.toLocaleString()} results found
								</p>
							)}
						</div>
					</div>

					{/* View Controls */}
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<button
								onClick={() => setViewMode('grid')}
								className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-white/10'
									}`}
							>
								<Grid className="w-5 h-5" />
							</button>
							<button
								onClick={() => setViewMode('list')}
								className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-white/10'
									}`}
							>
								<List className="w-5 h-5" />
							</button>
						</div>

						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="bg-background border border-white/20 rounded-lg px-4 py-2 text-sm"
						>
							<option value="popularity">Most Popular</option>
							<option value="vote_average">Highest Rated</option>
							<option value="release_date">Newest First</option>
							<option value="title">A-Z</option>
						</select>
					</div>
				</div>

				{/* Loading State */}
				{isLoading && (
					<div className="flex items-center justify-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
					</div>
				)}

				{/* Error State */}
				{error && (
					<div className="text-center py-12">
						<p className="text-red-400 mb-4">Error loading search results</p>
						<button onClick={() => window.location.reload()} className="primary-button">
							Try Again
						</button>
					</div>
				)}

				{/* Results */}
				{searchResults && sortedResults.length > 0 && (
					<>
						{viewMode === 'grid' ? (
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
								{sortedResults.map((movie, index) => (
									<motion.div
										key={`${movie.id}-${index}`}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: index * 0.05 }}
									>
										<MovieCard
											title={movie.title}
											posterUrl={`${baseImageUrl}${movie.poster_path}`}
											genres={mapMovieGenres(movie, [])}
											year={movie.release_date}
											rating={movie.vote_average}
											movieId={movie.id}
										/>
									</motion.div>
								))}
							</div>
						) : (
							<div className="space-y-4">
								{sortedResults.map((movie, index) => (
									<motion.div
										key={`${movie.id}-${index}`}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
										className="flex items-center p-4 glass-container hover:bg-white/10 transition-colors cursor-pointer"
										onClick={() => navigate(`/movie/${movie.id}`)}
									>
										<div className="flex-shrink-0 w-16 h-24 mr-4">
											{movie.poster_path ? (
												<img
													src={`${baseImageUrl}${movie.poster_path}`}
													alt={movie.title}
													className="w-full h-full object-cover rounded-md"
												/>
											) : (
												<div className="w-full h-full bg-white/10 rounded-md flex items-center justify-center">
													<span className="text-xs text-text-secondary">No Image</span>
												</div>
											)}
										</div>

										<div className="flex-grow">
											<h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
											<div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
												<span>{new Date(movie.release_date).getFullYear()}</span>
												<span>★ {movie.vote_average.toFixed(1)}</span>
												<span>{movie.vote_count} votes</span>
											</div>
											{movie.overview && (
												<p className="text-text-secondary text-sm line-clamp-2">
													{movie.overview}
												</p>
											)}
										</div>
									</motion.div>
								))}
							</div>
						)}

						{/* Load More Button */}
						{searchResults.page < searchResults.total_pages && (
							<div className="flex justify-center mt-12">
								<button
									onClick={handleLoadMore}
									className="primary-button"
									disabled={isLoading}
								>
									{isLoading ? 'Loading...' : 'Load More Results'}
								</button>
							</div>
						)}
					</>
				)}

				{/* No Results */}
				{searchResults && sortedResults.length === 0 && !isLoading && (
					<div className="text-center py-12">
						<h2 className="text-xl font-semibold mb-4">No movies found</h2>
						<p className="text-text-secondary mb-6">
							Try searching with different keywords or check your spelling.
						</p>
						<button onClick={handleGoBack} className="primary-button">
							Go Back
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchResults;