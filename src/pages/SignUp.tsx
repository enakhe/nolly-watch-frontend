import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useRegisterMutation } from '../api/userSlice';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const result = await register({
        fullName,
        username,
        email,
        password
      }).unwrap();
      
      // Store credentials in Redux and localStorage
      dispatch(setCredentials({
        user: result.user,
        token: result.token
      }));
      
      // Navigate to home page
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-text-secondary mt-2">
            Join the largest community of Nollywood enthusiasts
          </p>
        </div>

        <div className="bg-background/50 p-8 rounded-lg backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">
                  {'data' in error ? (error.data as any)?.message || 'Registration failed' : 'Registration failed'}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-background border border-white/20 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-primary"
                  placeholder="Enter your full name"
                  required
                />
                <User className="absolute left-3 top-2.5 w-5 h-5 text-text-secondary" />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-background border border-white/20 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-primary"
                  placeholder="Choose a username"
                  required
                />
                <User className="absolute left-3 top-2.5 w-5 h-5 text-text-secondary" />
              </div>
            </div>

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
                  placeholder="Create a password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-background border border-white/20 rounded-lg px-4 py-2 pl-10 pr-10 focus:outline-none focus:border-primary"
                  placeholder="Confirm your password"
                  required
                />
                <Lock className="absolute left-3 top-2.5 w-5 h-5 text-text-secondary" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-text-secondary hover:text-text"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="rounded border-white/20 text-primary focus:ring-primary bg-background"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:text-primary/80">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full primary-button py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;