import React from 'react';
import AIWaiterChat from '../features/food/AIWaiterChat';
import MealRecommendations from '../features/food/MealRecommendations';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🍽️ AI-Powered Food Personalization
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover personalized meals crafted by local chefs, powered by AI recommendations
            that learn from your preferences and dietary needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <AIWaiterChat />
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">📱 How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-gray-700">Chat with our AI Waiter about your food preferences</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-gray-700">Get personalized meal recommendations from local chefs</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-gray-700">Order meals and provide feedback to improve future suggestions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">🎯 Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  AI-powered meal recommendations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Dietary restrictions & allergy management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Local chef partnerships
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Integrated payment & delivery
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Learning from your feedback
                </li>
              </ul>
            </div>
          </div>
        </div>

        <MealRecommendations />
      </div>
    </div>
  );
};

export default Home;