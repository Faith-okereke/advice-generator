import React from 'react';
import './App.css';

export const Loading = () => {
  return (
    <div className="pulsing-dots-container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};