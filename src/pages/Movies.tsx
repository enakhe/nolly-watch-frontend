import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const movies = [
    {
      title: 'Lionheart',
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
      year: '2025',
      rating: 4.0,
      genres: ['Drama', 'Comedy'],
    },
    {
      title: 'Sugar Rush',
      posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcba9c5a98c',
      year: '2025',
      rating: 4.0,
      genres: ['Drama', 'Comedy'],
    },
    {
      title: 'Oloture',
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
      year: '2025',
      rating: 4.0,
      genres: ['Drama', 'Comedy'],
    },
    {
      title: 'Alaagba',
      posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcba9c5a98c',
      year: '2025',
      rating: 4.0,
      genres: ['Drama', 'Comedy'],
    },
  ];

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller'];
  const years = ['2025', '2024', '2023', '2022', '2021'];
  const ratings = ['4.5+', '4.0+', '3.5+', '3.0+'];
  const languages = ['English', 'Yoruba', 'Igbo', 'Hausa'];

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

            <FilterSection
              title="Language"
              options={languages}
              selected={selectedLanguage}
              onChange={setSelectedLanguage}
            />
          </div>

          {/* Movies Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Movies</h1>
              <select className="bg-background/50 text-text border border-white/20 rounded-lg px-4 py-2">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie, index) => (
                <MovieCard key={index} {...movie} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;