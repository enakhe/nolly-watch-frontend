import React, { useState } from 'react';

const Actors = () => {
	const [selectedFilter, setSelectedFilter] = useState('all');

	const actors = [
		{
			name: 'Funke Akindele',
			image: 'https://media.premiumtimesng.com/wp-content/files/2023/03/Funke-Akindele.jpg',
			rank: 1,
			change: 2,
			score: 9876,
		},
		{
			name: 'Richard Mofe-Damijo',
			image: 'https://c.files.bbci.co.uk/1EE1/production/_119250970_richardmofe-damijormdandsixthingsyounosabiaboutdinollywoodveteranactor.jpg',
			rank: 2,
			change: -1,
			score: 9654,
		},
		{
			name: 'Genevieve Nnaji',
			image: 'https://media.themoviedb.org/t/p/w500/hok4307uT1KoRAkPAyAukZjxCZJ.jpg',
			rank: 3,
			change: 1,
			score: 9432,
		},
		{
			name: 'Ramsey Nouah',
			image: 'https://cdn.businessday.ng/2022/05/Ramsey-Nouah-1.png',
			rank: 4,
			change: 0,
			score: 9210,
		},
	];

	const filters = [
		'All',
		'Award Winners',
		'Rising Stars',
		'Directors',
		'Producers',
	];

	return (
		<div className="pt-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Hero Section */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">Nollywood Stars</h1>
					<p className="text-text-secondary max-w-2xl mx-auto">
						Discover the talented actors and actresses shaping the Nigerian film industry.
					</p>
				</div>

				{/* Filters */}
				<div className="flex flex-wrap gap-4 mb-12 justify-center">
					{filters.map((filter) => (
						<button
							key={filter}
							onClick={() => setSelectedFilter(filter.toLowerCase())}
							className={`px-6 py-2 rounded-full border transition-colors ${selectedFilter === filter.toLowerCase()
									? 'bg-primary border-primary text-white'
									: 'border-white/20 hover:bg-white/10'
								}`}
						>
							{filter}
						</button>
					))}
				</div>

				{/* Actors Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{actors.map((actor, index) => (
						<div
							key={index}
							className="bg-background/50 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
						>
							<div className="aspect-[3/4] relative">
								<img
									src={actor.image}
									alt={actor.name}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
									<p className="text-sm text-white/80 mb-2">Known for: {actor.knownFor}</p>
									<p className="text-sm text-white/80">{actor.awards}</p>
								</div>
							</div>
							<div className="p-4">
								<h3 className="text-lg font-semibold mb-2">{actor.name}</h3>
								<p className="text-sm text-text-secondary">{actor.bio}</p>
								<button className="mt-4 w-full primary-button">View Profile</button>
							</div>
						</div>
					))}
				</div>

				{/* Featured Section */}
				<div className="mt-16 bg-background/50 rounded-lg p-8">
					<div className="text-center mb-8">
						<h2 className="text-2xl font-bold mb-4">Want to Join the Industry?</h2>
						<p className="text-text-secondary">
							Get started with your acting career. Join our network of talented professionals.
						</p>
					</div>
					<div className="flex justify-center gap-4">
						<button className="primary-button">Submit Portfolio</button>
						<button className="secondary-button">Learn More</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Actors;