// components/UserType.jsx
import React from 'react';

const UserType = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center mb-8">
          <img 
            src="/HOWAMiLogo.png" 
            alt="Howami Logo" 
            className="w-32 h-32 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-[#2D3748]">Choose Your Role</h2>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => onSelect('teen')}
            className="w-full p-6 bg-[#bce10c] text-white rounded-xl hover:bg-[#e48c04] transition-colors duration-300 shadow-lg text-lg font-semibold"
          >
            Teen
          </button>
          <button
            onClick={() => onSelect('parent')}
            className="w-full p-6 bg-[#bce10c] text-white rounded-xl hover:bg-[#e48c04] transition-colors duration-300 shadow-lg text-lg font-semibold"
          >
            Parent
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserType;