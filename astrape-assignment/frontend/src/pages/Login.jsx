import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Hexagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/products');
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-emerald-500/20 rotate-45"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-teal-500/20 rotate-12"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-cyan-500/20 -rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-blue-500/20 rotate-45"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <Hexagon className="w-12 h-12 text-cyan-400 animate-pulse" fill="currentColor" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Access Portal</h1>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-8 h-0.5 bg-cyan-400"></div>
            <div className="w-2 h-0.5 bg-teal-400"></div>
            <div className="w-4 h-0.5 bg-emerald-400"></div>
          </div>
        </div>

        {/* Login Container */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-300 uppercase tracking-wide">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                Email Address
              </label>
              <div className="group relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput('')}
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-900/70 transition-all duration-300"
                  placeholder="Email"
                />
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-400/20 transition-colors duration-300 pointer-events-none"></div>
                <Mail className={`absolute right-4 top-4 w-5 h-5 transition-all duration-300 ${
                  focusedInput === 'email' ? 'text-cyan-400 scale-110' : 'text-gray-500'
                }`} />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-300 uppercase tracking-wide">
                <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                Password
              </label>
              <div className="group relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput('')}
                  className="w-full px-4 py-4 pr-12 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-gray-900/70 transition-all duration-300"
                  placeholder="Password"
                />
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-teal-400/20 transition-colors duration-300 pointer-events-none"></div>
                <div className="absolute right-4 top-4 flex items-center space-x-2">
                  <Lock className={`w-4 h-4 transition-all duration-300 ${
                    focusedInput === 'password' ? 'text-teal-400 scale-110' : 'text-gray-500'
                  }`} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-30"></div>
                <div className="relative bg-red-900/50 border border-red-500/50 rounded-xl p-4">
                  <p className="text-red-300 text-sm font-medium flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:from-cyan-400 hover:to-teal-400 hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="uppercase tracking-wide">Login</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Separator */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <div className="px-4 text-gray-500 text-xs uppercase tracking-wider">OR</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Sign Up Link */}
          <Link
            to="/signup"
            className="block w-full text-center py-4 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-500 hover:bg-gray-700/30 transition-all duration-300 font-medium"
          >
            <span>Create New Account</span>
          </Link>
        </div>

        {/* Status Bar */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-cyan-400 rounded-full"></div>
            <div className="w-1 h-3 bg-teal-400 rounded-full"></div>
            <div className="w-1 h-2 bg-emerald-400 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-wider">Secure Connection</span>
        </div>
      </div>
    </div>
  );
};

export default Login;