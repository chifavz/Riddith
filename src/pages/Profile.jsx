import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPreferences, updatePreferences } from '../features/food/foodSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { preferences, status } = useSelector(state => state.food);
  
  const [formData, setFormData] = useState({
    dietary_restrictions: [],
    allergies: [],
    cuisine_preferences: [],
    spice_level: 'Medium',
    budget_range: '20-30'
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchPreferences());
  }, [dispatch]);

  useEffect(() => {
    if (preferences && Object.keys(preferences).length > 0) {
      setFormData(preferences);
    }
  }, [preferences]);

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 
    'Low-Carb', 'High-Protein', 'Dairy-Free', 'Organic'
  ];

  const allergyOptions = [
    'Nuts', 'Shellfish', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Fish'
  ];

  const cuisineOptions = [
    'Italian', 'Mexican', 'Asian', 'Mediterranean', 'Indian', 
    'American', 'French', 'Thai', 'Japanese', 'Middle Eastern'
  ];

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSave = () => {
    dispatch(updatePreferences(formData));
    setIsEditing(false);
    // In a real app, this would also save to backend
    alert('Preferences saved! The AI will use these to personalize your recommendations.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">👤 User Profile & Preferences</h1>
          <p className="text-gray-600">Customize your dietary preferences to get better AI recommendations</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Food Preferences</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg ${
                isEditing 
                  ? 'bg-gray-500 text-white hover:bg-gray-600'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {isEditing ? 'Cancel' : 'Edit Preferences'}
            </button>
          </div>

          {status === 'loading' && (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          )}

          {status !== 'loading' && (
            <div className="space-y-6">
              {/* Dietary Restrictions */}
              <div>
                <h3 className="text-lg font-medium mb-3">Dietary Restrictions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {dietaryOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.dietary_restrictions.includes(option)}
                        onChange={() => handleCheckboxChange('dietary_restrictions', option)}
                        disabled={!isEditing}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      <span className={`text-sm ${!isEditing ? 'text-gray-700' : 'text-gray-900'}`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <h3 className="text-lg font-medium mb-3">Allergies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {allergyOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.allergies.includes(option)}
                        onChange={() => handleCheckboxChange('allergies', option)}
                        disabled={!isEditing}
                        className="rounded text-red-500 focus:ring-red-500"
                      />
                      <span className={`text-sm ${!isEditing ? 'text-gray-700' : 'text-gray-900'}`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cuisine Preferences */}
              <div>
                <h3 className="text-lg font-medium mb-3">Preferred Cuisines</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {cuisineOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.cuisine_preferences.includes(option)}
                        onChange={() => handleCheckboxChange('cuisine_preferences', option)}
                        disabled={!isEditing}
                        className="rounded text-green-500 focus:ring-green-500"
                      />
                      <span className={`text-sm ${!isEditing ? 'text-gray-700' : 'text-gray-900'}`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div>
                <h3 className="text-lg font-medium mb-3">Spice Level</h3>
                <select
                  value={formData.spice_level}
                  onChange={(e) => setFormData({...formData, spice_level: e.target.value})}
                  disabled={!isEditing}
                  className="w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Mild">Mild</option>
                  <option value="Medium">Medium</option>
                  <option value="Hot">Hot</option>
                  <option value="Extra Hot">Extra Hot</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <h3 className="text-lg font-medium mb-3">Budget Range per Meal</h3>
                <select
                  value={formData.budget_range}
                  onChange={(e) => setFormData({...formData, budget_range: e.target.value})}
                  disabled={!isEditing}
                  className="w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="10-15">$10 - $15</option>
                  <option value="15-20">$15 - $20</option>
                  <option value="20-30">$20 - $30</option>
                  <option value="30-50">$30 - $50</option>
                  <option value="50+">$50+</option>
                </select>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="pt-4 border-t">
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                  >
                    Save Preferences
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Current Preferences Summary */}
          {!isEditing && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Current Preferences Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Dietary:</strong> {formData.dietary_restrictions.join(', ') || 'None specified'}
                </div>
                <div>
                  <strong>Allergies:</strong> {formData.allergies.join(', ') || 'None specified'}
                </div>
                <div>
                  <strong>Cuisines:</strong> {formData.cuisine_preferences.join(', ') || 'All cuisines'}
                </div>
                <div>
                  <strong>Spice Level:</strong> {formData.spice_level}
                </div>
                <div>
                  <strong>Budget:</strong> ${formData.budget_range} per meal
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;