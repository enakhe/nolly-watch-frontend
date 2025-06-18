import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	ArrowLeft,
	Star,
	Calendar,
	Users,
	Play,
	Plus,
	Share2,
	Heart,
} from 'lucide-react';
import { baseImageUrl } from '../constant';
import { useGetMovieByIdQuery, useGetMovieCastsQuery } from '../api/movieSlice';
import { useState } from 'react';
import WatchNowModal from '../components/WatchNowModal';

const MovieDetails = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleWatchNow = () => {
		console.log('Watch Now clicked!'); // Debug log
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		console.log('Closing modal'); // Debug log
		setIsModalOpen(false);
	};

	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data: movie,
	} = useGetMovieByIdQuery({
		movieId: parseInt(id ?? '0') || 0
	});

	const {
		data: castData,
	} = useGetMovieCastsQuery({
		movieId: parseInt(id ?? '0') || 0
	});

	const handleGoBack = () => {
		navigate(-1);
	};

	const formatRuntime = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours}h ${mins}m`;
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN',
			currencyDisplay: 'symbol',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className="pt-16 min-h-screen">
			{/* Hero Section with Backdrop */}
			<div className="relative h-[60vh] overflow-hidden">
				<img
					src={`${baseImageUrl}${movie?.backdrop_path}`}
					alt={movie?.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

				{/* Back Button */}
				<motion.button
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					onClick={handleGoBack}
					className="absolute top-8 left-8 flex items-center space-x-2 glass px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
					<span>Back</span>
				</motion.button>

				{/* Movie Title Overlay */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="absolute bottom-8 left-8 right-8"
				>
					<div className="max-w-4xl">
						<h1 className="text-5xl font-bold mb-4 gradient-text">{movie?.title}</h1>

						<div className="flex flex-wrap items-center gap-6 text-text-secondary">
							<div className="flex items-center">
								<Star className="w-5 h-5 text-yellow-400 mr-2" />
								<span className="text-white font-semibold">{movie?.vote_average.toFixed(1)}</span>
								<span className="ml-1">({movie?.vote_count} votes)</span>
							</div>
							<div className="flex items-center">
								<Calendar className="w-5 h-5 mr-2" />
								<span>{new Date(movie?.release_date ?? '').getFullYear()}</span>
							</div>
							{/* <div className="flex items-center">
								<Clock className="w-5 h-5 mr-2" />
								<span>{formatRuntime(movie.runtime)}</span>
							</div>
							<div className="flex items-center">
								<Globe className="w-5 h-5 mr-2" />
								<span>{movie.original_language.toUpperCase()}</span>
							</div> */}
						</div>
					</div>
				</motion.div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

					{/* Left Column - Poster and Actions */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4 }}
						className="lg:col-span-1"
					>
						<div className="sticky top-24">
							<img
								src={`${baseImageUrl}${movie?.poster_path}`}
								alt={movie?.title}
								className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl mb-8"
							/>

							{/* Action Buttons */}
							<div className="space-y-4">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={handleWatchNow}
									className="w-full primary-button flex items-center justify-center py-3"
								>
									<Play className="w-5 h-5 mr-2" />
									Watch Trailer
								</motion.button>

								<div className="grid grid-cols-3 gap-3">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="secondary-button flex items-center justify-center py-3"
									>
										<Plus className="w-5 h-5" />
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="secondary-button flex items-center justify-center py-3"
									>
										<Heart className="w-5 h-5" />
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="secondary-button flex items-center justify-center py-3"
									>
										<Share2 className="w-5 h-5" />
									</motion.button>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Right Column - Movie Details */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.5 }}
						className="lg:col-span-2 space-y-8"
					>

						{/* Genres */}
						<div>
							<div className="flex flex-wrap gap-3 mb-6">
								{movie?.genres.map((genre) => (
										<span
											key={genre.id}
											className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
										>
											{genre.name}
										</span>
									))
								}
							</div>
						</div>

						{/* Overview */}
						<div>
							<h2 className="text-2xl font-bold mb-4">Overview</h2>
							<p className="text-text-secondary leading-relaxed text-lg">{movie?.overview}</p>
						</div>

						{/* Movie Stats */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="glass-container">
								<h3 className="text-lg font-semibold mb-4">Movie Info</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-text-secondary">Release Date</span>
										<span>{new Date(movie?.release_date ?? '').toLocaleDateString()}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-text-secondary">Runtime</span>
										<span>{formatRuntime(movie?.runtime ?? 0)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-text-secondary">Language</span>
										<span>{movie?.original_language.toUpperCase()}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-text-secondary">Popularity</span>
										<span>{movie?.popularity.toFixed(1)}</span>
									</div>
								</div>
							</div>

							<div className="glass-container">
								<h3 className="text-lg font-semibold mb-4">Box Office</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-text-secondary">Budget</span>
										<span>{formatCurrency(movie?.budget ?? 0)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-text-secondary">Revenue</span>
										<span>{formatCurrency(movie?.revenue ?? 0)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-text-secondary">Profit</span>
										<span className="text-green-400">
											{formatCurrency((movie?.revenue ?? 0) - (movie?.budget ?? 0))}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Cast */}
						<div>
							<h2 className="text-2xl font-bold mb-6">Cast</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
								{castData?.cast.map((actor, index) => (
									<motion.div
										key={actor.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.6 + index * 0.1 }}
										className="text-center glass-container p-4"
									>
										<div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
											{actor.profile_path ? (
												<img
													src={`${baseImageUrl}${actor.profile_path}`}
													alt={actor.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<Users className="w-10 h-10 text-primary" />
											)}
										</div>
										<h4 className="font-semibold">{actor.name}</h4>
										<p className="text-text-secondary text-sm">{actor.character}</p>
										{actor.known_for_department && (
											<p className="text-xs text-text-secondary mt-1">
												{actor.known_for_department}
											</p>
										)}
										{typeof actor.popularity === 'number' && (
											<p className="text-xs text-yellow-500 mt-1">
												Popularity: {actor.popularity.toFixed(1)}
											</p>
										)}
									</motion.div>
								))}
							</div>
						</div>

						{/* Crew */}
						<div>
							<h2 className="text-2xl font-bold mb-6">Crew</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{castData?.crew.map((member, index) => (
									<motion.div
										key={member.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.8 + index * 0.1 }}
										className="flex items-center space-x-4 glass-container"
									>
										<div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
											{member.profile_path ? (
												<img
													src={`${baseImageUrl}${member.profile_path}`}
													alt={member.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<Users className="w-6 h-6 text-primary" />
											)}
										</div>
										<div>
											<h4 className="font-semibold">{member.name}</h4>
											<p className="text-text-secondary text-sm">{member.job}</p>
											{member.known_for_department && (
												<p className="text-xs text-text-secondary">
													Department: {member.known_for_department}
												</p>
											)}
											{typeof member.popularity === 'number' && (
												<p className="text-xs text-yellow-500">
													Popularity: {member.popularity.toFixed(1)}
												</p>
											)}
											{member.gender !== undefined && (
												<p className="text-xs text-text-secondary">
													Gender: {member.gender === 1 ? 'Female' : member.gender === 2 ? 'Male' : 'Other'}
												</p>
											)}
										</div>
									</motion.div>
								))}
							</div>
						</div>

						<div className="glass-container">
							<h2 className="text-2xl font-bold mb-6">Production</h2>
							<div className="space-y-4">
								<div>
									<h4 className="font-semibold mb-2">Production Companies</h4>
									<div className="flex flex-wrap gap-2">
										{movie?.production_companies.map((company, index) => (
											<span
												key={index}
												className="px-3 py-1 bg-white/10 rounded-full text-sm"
											>
												{company.name}
											</span>
										))}
									</div>
								</div>

								<div>
									<h4 className="font-semibold mb-2">Countries</h4>
									<div className="flex flex-wrap gap-2">
										{movie?.production_countries.map((country, index) => (
											<span
												key={index}
												className="px-3 py-1 bg-white/10 rounded-full text-sm"
											>
												{country.name}
											</span>
										))}
									</div>
								</div>

								<div>
									<h4 className="font-semibold mb-2">Languages</h4>
									<div className="flex flex-wrap gap-2">
										{movie?.spoken_languages.map((language, index) => (
											<span
												key={index}
												className="px-3 py-1 bg-white/10 rounded-full text-sm"
											>
												{language.name}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
			<WatchNowModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				movie={movie}
			/>
		</div>
	);
};

export default MovieDetails;