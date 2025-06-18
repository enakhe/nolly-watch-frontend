import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit, Plus, Trash2, Eye } from 'lucide-react';
import { useGetUserProfileQuery, useGetWatchlistsQuery, useCreateWatchlistMutation, useRemoveFromWatchlistMutation } from '../api/userSlice';
import { useGetMovieByIdQuery } from '../api/movieSlice';
import { baseImageUrl } from '../constant';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'watchlists'>('profile');
  const [selectedWatchlist, setSelectedWatchlist] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [newWatchlistDescription, setNewWatchlistDescription] = useState('');

  const { data: userProfile, isLoading: profileLoading } = useGetUserProfileQuery();
  const { data: watchlistsData, isLoading: watchlistsLoading } = useGetWatchlistsQuery();
  const [createWatchlist, { isLoading: creating }] = useCreateWatchlistMutation();
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation();

  const user = userProfile?.user;
  const watchlists = watchlistsData?.watchlists || [];

  const handleCreateWatchlist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWatchlist({
        name: newWatchlistName,
        description: newWatchlistDescription
      }).unwrap();
      setShowCreateModal(false);
      setNewWatchlistName('');
      setNewWatchlistDescription('');
    } catch (error) {
      console.error('Failed to create watchlist:', error);
    }
  };

  const handleRemoveFromWatchlist = async (watchlistId: string, movieId: number) => {
    try {
      await removeFromWatchlist({ watchlistId, movieId }).unwrap();
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
    }
  };

  if (profileLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <button onClick={() => navigate('/')} className="primary-button">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-container mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
              )}
              <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full hover:bg-primary/80 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-2">{user.fullName}</h1>
              <p className="text-text-secondary mb-1">@{user.username}</p>
              <p className="text-text-secondary">{user.email}</p>
              <p className="text-sm text-text-secondary mt-2">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'profile'
                ? 'bg-primary text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab('watchlists')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'watchlists'
                ? 'bg-primary text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            My Watchlists ({watchlists.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-container"
          >
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={user.fullName}
                  readOnly
                  className="w-full input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={user.username}
                  readOnly
                  className="w-full input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Member Since</label>
                <input
                  type="text"
                  value={new Date(user.createdAt).toLocaleDateString()}
                  readOnly
                  className="w-full input-field"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="primary-button">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'watchlists' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Create Watchlist Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Watchlists</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="primary-button flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Watchlist
              </button>
            </div>

            {watchlistsLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : watchlists.length === 0 ? (
              <div className="text-center py-12 glass-container">
                <h3 className="text-xl font-semibold mb-4">No watchlists yet</h3>
                <p className="text-text-secondary mb-6">
                  Create your first watchlist to start organizing your favorite movies!
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="primary-button"
                >
                  Create Your First Watchlist
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Watchlists List */}
                <div className="lg:col-span-1">
                  <div className="glass-container">
                    <h3 className="text-lg font-semibold mb-4">Your Watchlists</h3>
                    <div className="space-y-2">
                      {watchlists.map((watchlist) => (
                        <button
                          key={watchlist._id}
                          onClick={() => setSelectedWatchlist(watchlist._id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedWatchlist === watchlist._id
                              ? 'bg-primary text-white'
                              : 'hover:bg-white/10'
                          }`}
                        >
                          <div className="font-medium">{watchlist.name}</div>
                          <div className="text-sm opacity-80">
                            {watchlist.movies.length} movies
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Watchlist Movies */}
                <div className="lg:col-span-2">
                  {selectedWatchlist ? (
                    <WatchlistMovies
                      watchlist={watchlists.find(w => w._id === selectedWatchlist)!}
                      onRemoveMovie={handleRemoveFromWatchlist}
                    />
                  ) : (
                    <div className="glass-container flex items-center justify-center h-64">
                      <p className="text-text-secondary">Select a watchlist to view movies</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Create Watchlist Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-background glass rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Create New Watchlist</h3>
              <form onSubmit={handleCreateWatchlist} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    className="w-full input-field"
                    placeholder="Enter watchlist name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                  <textarea
                    value={newWatchlistDescription}
                    onChange={(e) => setNewWatchlistDescription(e.target.value)}
                    className="w-full input-field h-20 resize-none"
                    placeholder="Enter description"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 secondary-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 primary-button disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component to display movies in a watchlist
const WatchlistMovies: React.FC<{
  watchlist: any;
  onRemoveMovie: (watchlistId: string, movieId: number) => void;
}> = ({ watchlist, onRemoveMovie }) => {
  const navigate = useNavigate();

  return (
    <div className="glass-container">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">{watchlist.name}</h3>
          {watchlist.description && (
            <p className="text-text-secondary text-sm">{watchlist.description}</p>
          )}
        </div>
        <span className="text-sm text-text-secondary">
          {watchlist.movies.length} movies
        </span>
      </div>

      {watchlist.movies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-secondary">No movies in this watchlist yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {watchlist.movies.map((movieId: number) => (
            <WatchlistMovieCard
              key={movieId}
              movieId={movieId}
              watchlistId={watchlist._id}
              onRemove={onRemoveMovie}
              onViewDetails={() => navigate(`/movie/${movieId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Component for individual movie cards in watchlist
const WatchlistMovieCard: React.FC<{
  movieId: number;
  watchlistId: string;
  onRemove: (watchlistId: string, movieId: number) => void;
  onViewDetails: () => void;
}> = ({ movieId, watchlistId, onRemove, onViewDetails }) => {
  const { data: movie, isLoading } = useGetMovieByIdQuery({ movieId });

  if (isLoading) {
    return (
      <div className="aspect-[2/3] bg-white/10 rounded-lg animate-pulse"></div>
    );
  }

  if (!movie) {
    return (
      <div className="aspect-[2/3] bg-white/10 rounded-lg flex items-center justify-center">
        <span className="text-xs text-text-secondary">Movie not found</span>
      </div>
    );
  }

  return (
    <div className="relative group">
      <img
        src={`${baseImageUrl}${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <div className="flex space-x-2">
          <button
            onClick={onViewDetails}
            className="p-2 bg-primary rounded-full hover:bg-primary/80 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(watchlistId, movieId)}
            className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            title="Remove from Watchlist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
        <h4 className="text-xs font-medium text-white truncate">{movie.title}</h4>
      </div>
    </div>
  );
};

export default Profile;