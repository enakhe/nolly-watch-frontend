import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLoginMutation } from '../api/userSlice';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading, error }] = useLoginMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const result = await login({ email, password }).unwrap();

			console.log('Login successful:', result);
			// Store credentials in Redux and localStorage
			dispatch(setCredentials({
				user: result.user,
				token: result.token
			}));

			// Navigate to home page
			navigate('/');
		} catch (err) {
			console.error('Login failed:', err);
		}
	};

	return (
		<div className="min-h-screen pt-16 pb-8 flex flex-col justify-center">
			<div className="max-w-md mx-auto w-full px-4 sm:px-6">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold">Welcome Back</h1>
					<p className="text-text-secondary mt-2">
						Sign in to continue your Nollywood journey
					</p>
				</div>

				<div className="bg-background/50 p-8 rounded-lg backdrop-blur-sm">
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
								<p className="text-red-400 text-sm">
									{'data' in error ? (error.data as any)?.message || 'Login failed' : 'Login failed'}
								</p>
							</div>
						)}

						<div>
							<label htmlFor="email" className="block text-sm font-medium mb-2">
								Email Address
							</label>
							<div className="relative">
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full bg-background border border-white/20 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-primary"
									placeholder="Enter your email"
									required
								/>
								<Mail className="absolute left-3 top-2.5 w-5 h-5 text-text-secondary" />
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium mb-2">
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full bg-background border border-white/20 rounded-lg px-4 py-2 pl-10 pr-10 focus:outline-none focus:border-primary"
									placeholder="Enter your password"
									required
								/>
								<Lock className="absolute left-3 top-2.5 w-5 h-5 text-text-secondary" />
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-2.5 text-text-secondary hover:text-text"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									className="rounded border-white/20 text-primary focus:ring-primary bg-background"
								/>
								<span className="ml-2 text-sm">Remember me</span>
							</label>
							<Link
								to="/forgot-password"
								className="text-sm text-primary hover:text-primary/80"
							>
								Forgot password?
							</Link>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full primary-button py-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? 'Signing In...' : 'Sign In'}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-text-secondary">
							Don't have an account?{' '}
							<Link to="/signup" className="text-primary hover:text-primary/80">
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;