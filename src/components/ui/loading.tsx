"use client";

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${sizeClasses[size]} ${className}`} />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="card p-6 animate-pulse">
      <div className="skeleton h-48 w-full rounded-lg mb-4"></div>
      <div className="skeleton h-6 w-3/4 rounded mb-2"></div>
      <div className="skeleton h-4 w-full rounded mb-2"></div>
      <div className="skeleton h-4 w-2/3 rounded"></div>
    </div>
  );
};

export const SkeletonArticle: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="skeleton h-64 w-full rounded-lg mb-6"></div>
      <div className="skeleton h-8 w-3/4 rounded mb-4"></div>
      <div className="skeleton h-4 w-full rounded mb-2"></div>
      <div className="skeleton h-4 w-full rounded mb-2"></div>
      <div className="skeleton h-4 w-2/3 rounded mb-6"></div>
      <div className="skeleton h-4 w-full rounded mb-2"></div>
      <div className="skeleton h-4 w-full rounded mb-2"></div>
      <div className="skeleton h-4 w-3/4 rounded"></div>
    </div>
  );
};

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
