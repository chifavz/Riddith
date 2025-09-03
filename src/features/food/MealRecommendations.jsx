import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecommendations } from './foodSlice';

const MealRecommendations = () => {
  const dispatch = useDispatch();
  const { recommendations, status, error } = useSelector(state => state.food);

  useEffect(() => {
    if (recommendations.length === 0) {
      dispatch(fetchRecommendations());
    }
  }, [dispatch, recommendations.length]);

  const handleOrderMeal = (meal) => {
    alert(`Ordering ${meal.name} for $${meal.price}! This would integrate with payment processing.`);
  };

  if (status === 'loading') {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>Error loading recommendations: {error}</p>
        <button
          onClick={() => dispatch(fetchRecommendations())}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🍽️ Personalized Meal Recommendations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((meal) => (
          <div key={meal.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
              <p className="text-gray-600 mb-2">by {meal.chef}</p>
              <p className="text-sm text-gray-700 mb-3">{meal.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {meal.dietary.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm text-gray-600">{meal.rating}</span>
                </div>
                <span className="text-xl font-bold text-orange-600">${meal.price}</span>
              </div>
              
              <button
                onClick={() => handleOrderMeal(meal)}
                className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {recommendations.length === 0 && status === 'succeeded' && (
        <div className="text-center p-8 text-gray-600">
          <p>No recommendations yet. Chat with the AI Waiter to get personalized suggestions!</p>
        </div>
      )}
    </div>
  );
};

export default MealRecommendations;