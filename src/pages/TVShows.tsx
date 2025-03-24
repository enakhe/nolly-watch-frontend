import { useState } from 'react';
import MovieCard from '../components/MovieCard';

const TVShows = () => {
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [selectedNetwork, setSelectedNetwork] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<string>('');
	const [selectedRating, setSelectedRating] = useState<string>('');

	const shows = [
		{
			title: 'Lionheart',
			posterUrl: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABSbimxCA5v7-p5YNNYs2MNfIPGCe77qkv5JchdePiYsFjETOxWRFYjeGxR9hNiS-Rtx2h3zs83YXg79cZoeOzk_6Oun44aeuySZ0PEcpEjVAUo-_N6misRNhWKReePdGeeS_UA.jpg?r=59f',
			year: '2025',
			rating: 4.0,
			genres: ['Drama', 'Comedy'],
		},
		{
			title: 'Sugar Rush',
			posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Sugar_Rush_2019_poster.jpg',
			year: '2025',
			rating: 4.2,
			genres: ['Action', 'Comedy'],
		},
		{
			title: 'Oloture',
			posterUrl: 'https://m.media-amazon.com/images/M/MV5BZDY5ODljMDktNjBmMC00YjQ1LTk1OTYtOTM3Njg4YTEzYzY0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
			year: '2025',
			rating: 4.5,
			genres: ['Drama', 'Thriller'],
		},
		{
			title: 'Alaagba',
			posterUrl: 'https://nollywire.com/wp-content/uploads/2023/05/Alaagba-2023-Nollywire.jpg',
			year: '2025',
			rating: 4.1,
			genres: ['Drama', 'Mystery'],
		},
		{
			title: 'Gang of Lagos',
			posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/03/Gangoflagos.jpg',
			year: '2025',
			rating: 4.1,
			genres: ['Drama', 'Mystery'],
		},
	];

	const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller'];
	const networks = ['Netflix', 'Amazon Prime', 'ShowMax', 'IrokoTV'];
	const years = ['2025', '2024', '2023', '2022', '2021'];
	const ratings = ['4.5+', '4.0+', '3.5+', '3.0+'];

	const FilterSection = ({ title, options, selected, onChange }: {
		title: string;
		options: string[];
		selected: string | string[];
		onChange: (value: string) => void;
	}) => (
		<div className="mb-6">
			<h3 className="text-lg font-semibold mb-3">{title}</h3>
			<div className="space-y-2">
				{options.map((option) => (
					<label key={option} className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={Array.isArray(selected) ? selected.includes(option) : selected === option}
							onChange={() => onChange(option)}
							className="form-checkbox text-primary"
						/>
						<span className="text-text-secondary">{option}</span>
					</label>
				))}
			</div>
		</div>
	);

	return (
		<div className="pt-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col md:flex-row gap-8">
					{/* Filters Sidebar */}
					<div className="w-full md:w-64 bg-background/50 p-6 rounded-lg h-fit">
						<h2 className="text-xl font-bold mb-6">Filters</h2>

						<FilterSection
							title="Genre"
							options={genres}
							selected={selectedGenres}
							onChange={(genre) => {
								setSelectedGenres(prev =>
									prev.includes(genre)
										? prev.filter(g => g !== genre)
										: [...prev, genre]
								);
							}}
						/>

						<FilterSection
							title="Network"
							options={networks}
							selected={selectedNetwork}
							onChange={setSelectedNetwork}
						/>

						<FilterSection
							title="Year"
							options={years}
							selected={selectedYear}
							onChange={setSelectedYear}
						/>

						<FilterSection
							title="Rating"
							options={ratings}
							selected={selectedRating}
							onChange={setSelectedRating}
						/>
					</div>

					{/* TV Shows Grid */}
					<div className="flex-1">
						<div className="flex justify-between items-center mb-6">
							<h1 className="text-2xl font-bold">TV Shows</h1>
							<label htmlFor="sortMovies" className="sr-only">Sort Movies</label>
							<select id="sortMovies" className="bg-[#161616] text-text border border-white/20 rounded-lg px-4 py-2">
								<option value="newest">Newest First</option>
								<option value="oldest">Oldest First</option>
								<option value="rating">Highest Rated</option>
							</select>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
							{shows.map((show, index) => (
								<MovieCard key={index} {...show} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TVShows;