import React, { useState } from 'react';

const ChefDashboard = () => {
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: "Grilled Salmon with Quinoa",
      status: "active",
      orders: 12,
      rating: 4.8,
      price: 24.99
    },
    {
      id: 2,
      name: "Vegan Buddha Bowl",
      status: "active",
      orders: 8,
      rating: 4.6,
      price: 19.99
    },
    {
      id: 3,
      name: "Grass-Fed Beef Tacos",
      status: "draft",
      orders: 0,
      rating: 0,
      price: 22.99
    }
  ]);

  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    price: '',
    dietary: []
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (newMeal.name && newMeal.price) {
      const meal = {
        id: Date.now(),
        ...newMeal,
        status: 'draft',
        orders: 0,
        rating: 0,
        price: parseFloat(newMeal.price)
      };
      setMeals([...meals, meal]);
      setNewMeal({ name: '', description: '', price: '', dietary: [] });
      setShowAddForm(false);
    }
  };

  const toggleMealStatus = (id) => {
    setMeals(meals.map(meal => 
      meal.id === id 
        ? { ...meal, status: meal.status === 'active' ? 'inactive' : 'active' }
        : meal
    ));
  };

  const totalOrders = meals.reduce((sum, meal) => sum + meal.orders, 0);
  const activeMenus = meals.filter(meal => meal.status === 'active').length;
  const avgRating = meals.reduce((sum, meal) => sum + meal.rating, 0) / meals.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">👨‍🍳 Chef Dashboard</h1>
          <p className="text-gray-600">Manage your menu and track your performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-orange-600">{totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Active Menus</h3>
            <p className="text-3xl font-bold text-green-600">{activeMenus}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Avg Rating</h3>
            <p className="text-3xl font-bold text-yellow-600">{avgRating.toFixed(1)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-3xl font-bold text-blue-600">$1,247</p>
          </div>
        </div>

        {/* Menu Management */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menu Items</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              + Add New Meal
            </button>
          </div>

          {/* Add Meal Form */}
          {showAddForm && (
            <form onSubmit={handleAddMeal} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Meal Name"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newMeal.price}
                  onChange={(e) => setNewMeal({...newMeal, price: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <textarea
                placeholder="Description"
                value={newMeal.description}
                onChange={(e) => setNewMeal({...newMeal, description: e.target.value})}
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                rows="3"
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add Meal
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Meals List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3">Meal Name</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Orders</th>
                  <th className="text-left p-3">Rating</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal.id} className="border-t">
                    <td className="p-3 font-medium">{meal.name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        meal.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : meal.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {meal.status}
                      </span>
                    </td>
                    <td className="p-3">{meal.orders}</td>
                    <td className="p-3">
                      {meal.rating > 0 ? (
                        <span className="flex items-center gap-1">
                          ⭐ {meal.rating}
                        </span>
                      ) : (
                        <span className="text-gray-400">No ratings</span>
                      )}
                    </td>
                    <td className="p-3">${meal.price}</td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleMealStatus(meal.id)}
                        className={`px-3 py-1 text-xs rounded ${
                          meal.status === 'active'
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {meal.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;