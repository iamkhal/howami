// components/Login.jsx
import React, { useState } from 'react';

const Login = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (isLogin) {
      onLogin(email, password);
    } else {
      const success = await onSignup(email, password);
      if (success) setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2D3748]">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-4 border border-[#E8F1F2] rounded-lg focus:outline-none focus:border-[#bce10c] focus:ring-2 focus:ring-[#bce10c]/50 transition-all duration-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-4 border border-[#E8F1F2] rounded-lg focus:outline-none focus:border-[#bce10c] focus:ring-2 focus:ring-[#bce10c]/50 transition-all duration-300"
          />
          {!isLogin && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-4 border border-[#E8F1F2] rounded-lg focus:outline-none focus:border-[#bce10c] focus:ring-2 focus:ring-[#bce10c]/50 transition-all duration-300"
            />
          )}
          <button
            type="submit"
            className="w-full p-4 bg-[#bce10c] text-white rounded-lg hover:bg-[#e48c04] transition-colors duration-300 shadow-md"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-[#e48c04] hover:text-[#bce10c] transition-colors duration-300"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;