import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useLazySearchMoviesQuery } from '../api/movieSlice';
import { useGetUserProfileQuery } from '../api/userSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import SearchDropdown from './SearchDropdown';
import { useDebounce } from '../hooks/useDebounce';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const searchRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const userMenuRef = useRef<HTMLDivElement>(null);

	const { isAuthenticated, user } = useAppSelector((state) => state.auth);

	// Only fetch user profile if authenticated
	const { data: userProfile } = useGetUserProfileQuery(undefined, {
		skip: !isAuthenticated,
	});

	// Debounce search query to avoid too many API calls
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	// Lazy query for search - only triggers when we call it
	const [searchMovies, { data: searchResults, isLoading: isSearchLoading }] = useLazySearchMoviesQuery();

	const navigation = [
		{ name: 'Home', path: '/' },
		{ name: 'Movies', path: '/movies' },
		{ name: 'TV Shows', path: '/tv-shows' },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Handle search when debounced query changes
	useEffect(() => {
		if (debouncedSearchQuery.trim().length > 0) {
			searchMovies({ query: debouncedSearchQuery });
		}
	}, [debouncedSearchQuery, searchMovies]);

	// Handle clicks outside search dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setIsSearchFocused(false);
				setIsSearchOpen(false);
			}
			if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
				setIsUserMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSearchToggle = () => {
		setIsSearchOpen(!isSearchOpen);
		if (!isSearchOpen) {
			// Focus input when opening search
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		} else {
			// Clear search when closing
			setSearchQuery('');
			setIsSearchFocused(false);
		}
	};

	const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchFocus = () => {
		setIsSearchFocused(true);
	};

	const handleSearchClose = () => {
		setIsSearchFocused(false);
		setSearchQuery('');
	};

	const handleLogout = () => {
		dispatch(logout());
		setIsUserMenuOpen(false);
		navigate('/');
	};

	const shouldShowDropdown = isSearchFocused && (searchQuery.length > 0 || isSearchLoading);

	const currentUser = userProfile || user;

	return (
		<header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-3'
			}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<Link to="/" className="text-2xl font-bold gradient-text">
							NollyWatch
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.path}
								className={`nav-link text-sm font-medium ${location.pathname === item.path ? 'text-primary' : 'text-text'
									}`}>
								{item.name}
							</Link>
						))}
					</nav>

					<div className="hidden md:flex items-center space-x-4">
						<div className="relative" ref={searchRef}>
							<button
								title='Search'
								onClick={handleSearchToggle}
								className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
							>
								<Search className="w-5 h-5" />
							</button>

							{/* Desktop Search Dropdown */}
							{isSearchOpen && (
								<div className="absolute right-0 top-full mt-2 w-80">
									<div className="relative">
										<input
											ref={inputRef}
											type="text"
											value={searchQuery}
											onChange={handleSearchInputChange}
											onFocus={handleSearchFocus}
											placeholder="Search movies, TV shows, actors..."
											className="w-full input-field pl-10 pr-4"
										/>
										<Search className="absolute left-3 top-2.5 w-5 h-5 text-text-secondary" />

										<SearchDropdown
											isOpen={shouldShowDropdown}
											searchResults={searchResults?.results || []}
											isLoading={isSearchLoading}
											searchQuery={searchQuery}
											onClose={handleSearchClose}
										/>
									</div>
								</div>
							)}
						</div>

						{/* Authentication Section */}
						{isAuthenticated && currentUser ? (
							<div className="relative" ref={userMenuRef}>
								<button
									onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
									className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
								>
									{('profilePicture' in currentUser ? currentUser.profilePicture : currentUser.user?.profilePicture) ? (
										<img
											src={'profilePicture' in currentUser ? currentUser.profilePicture : currentUser.user?.profilePicture}
											alt={'fullName' in currentUser ? currentUser.fullName : currentUser.user?.fullName}
											className="w-8 h-8 rounded-full object-cover"
										/>
									) : (
										<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
											<User className="w-4 h-4" />
										</div>
									)}
									<span className="text-sm font-medium">{'fullName' in currentUser ? currentUser.fullName : currentUser.user?.fullName}</span>
								</button>

								{/* User Dropdown Menu */}
								{isUserMenuOpen && (
									<div className="absolute right-0 top-full mt-2 w-48 glass rounded-lg shadow-lg py-2">
										<Link
											to="/profile"
											className="flex items-center px-4 py-2 text-sm hover:bg-white/10 transition-colors"
											onClick={() => setIsUserMenuOpen(false)}
										>
											<User className="w-4 h-4 mr-2" />
											Profile
										</Link>
										<button
											onClick={handleLogout}
											className="flex items-center w-full px-4 py-2 text-sm hover:bg-white/10 transition-colors text-left"
										>
											<LogOut className="w-4 h-4 mr-2" />
											Sign Out
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link to="/signin" className="secondary-button">
									Sign In
								</Link>
								<Link to="/signup" className="primary-button pulsing">
									Sign Up
								</Link>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="flex md:hidden items-center space-x-4">
						<button
							title='Search'
							onClick={handleSearchToggle}
							className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
						>
							<Search className="w-5 h-5" />
						</button>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
						>
							{isMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Search bar */}
				{isSearchOpen && (
					<div className="py-4 px-2 animate-fadeIn md:hidden" ref={searchRef}>
						<div className="relative">
							<input
								ref={inputRef}
								type="text"
								value={searchQuery}
								onChange={handleSearchInputChange}
								onFocus={handleSearchFocus}
								placeholder="Search movies, TV shows, actors..."
								className="w-full input-field pl-10"
							/>
							<Search className="absolute left-3 top-2.5 w-5 h-5 text-text-secondary" />

							<SearchDropdown
								isOpen={shouldShowDropdown}
								searchResults={searchResults?.results || []}
								isLoading={isSearchLoading}
								searchQuery={searchQuery}
								onClose={handleSearchClose}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden glass animate-fadeIn">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.path}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${location.pathname === item.path
									? 'text-primary bg-white/10'
									: 'text-text hover:bg-white/10'
									}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						
						{isAuthenticated && currentUser ? (
							<>
								<Link
									to="/profile"
									className="block px-3 py-2 text-base font-medium text-text hover:bg-white/10 rounded-md transition-colors duration-300"
									onClick={() => setIsMenuOpen(false)}
								>
									Profile
								</Link>
								<button
									onClick={() => {
										handleLogout();
										setIsMenuOpen(false);
									}}
									className="block w-full text-left px-3 py-2 text-base font-medium text-text hover:bg-white/10 rounded-md transition-colors duration-300"
								>
									Sign Out
								</button>
							</>
						) : (
							<>
								<Link
									to="/signin"
									className="block px-3 py-2 text-base font-medium text-text hover:bg-white/10 rounded-md transition-colors duration-300"
									onClick={() => setIsMenuOpen(false)}
								>
									Sign In
								</Link>
								<Link
									to="/signup"
									className="block px-3 py-2 text-base font-medium text-primary hover:bg-white/10 rounded-md transition-colors duration-300"
									onClick={() => setIsMenuOpen(false)}
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;