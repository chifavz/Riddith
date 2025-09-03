import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍽️</span>
            <h1 className="text-xl font-bold">AI Food Waiter</h1>
          </Link>
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Chef Dashboard
            </Link>
            <Link 
              to="/profile" 
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Profile
            </Link>
            <Link 
              to="/blueprint" 
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Blueprint
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}


