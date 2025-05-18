import React, { useState, useEffect, useRef } from 'react';
import './MealLog.css';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const initialSuggestions = [
  'Avocado Toast', 'Apple Pie', 'Almond Butter Smoothie', 'Asparagus Soup',
  'Banana Pancakes', 'Beef Stir Fry', 'Blueberry Muffins', 'Brussels Sprouts',
  'Chicken Salad', 'Carrot Soup', 'Caesar Salad', 'Chocolate Pudding',
  'Date Bars', 'Duck Breast', 'Deviled Eggs', 'Dumplings',
  'Eggs Benedict', 'Edamame Snack', 'Eggplant Parmesan', 'Energy Bites',
  'Fruit Salad', 'French Toast', 'Fried Rice', 'Falafel Wrap',
  'Granola Bowl', 'Garlic Bread', 'Grilled Cheese', 'Greek Yogurt',
  'Hummus Plate', 'Ham Sandwich', 'Honey Glazed Carrots', 'Herb Omelette',
  'Italian Pasta', 'Ice Cream', 'Irish Stew', 'Italian Sausage',
  'Jelly Sandwich', 'Jambalaya', 'Juice Detox', 'Jam Tart',
  'Kale Salad', 'Kebab Skewers', 'Kiwi Smoothie', 'Kitchari',
  'Lentil Soup', 'Lemon Chicken', 'Lasagna', 'Lobster Roll',
  'Mango Salsa', 'Meatballs', 'Minestrone Soup', 'Mac and Cheese',
  'Noodle Stir Fry', 'Nutella Crepes', 'Nachos', 'Naan Bread',
  'Oatmeal', 'Omelette', 'Orange Chicken', 'Onion Rings',
  'Pancakes', 'Pesto Pasta', 'Pulled Pork', 'Potato Salad',
  'Quinoa Salad', 'Quesadilla', 'Quiche', 'Quick Bread',
  'Rice Bowl', 'Ratatouille', 'Roast Beef', 'Ravioli',
  'Smoothie Bowl', 'Steak', 'Sushi', 'Spinach Dip',
  'Tacos', 'Tomato Soup', 'Turkey Sandwich', 'Tuna Salad',
  'Udon Noodles', 'Upside-down Cake', 'Ugali', 'Unagi Sushi',
  'Veggie Burger', 'Vanilla Pudding', 'Vegetable Stir Fry', 'Vichyssoise',
  'Waffles', 'Watermelon Salad', 'Wild Rice', 'White Bean Soup',
  'Xacuti Curry', 'Xiao Long Bao', 'Xnipec Salsa', 'Xigua Fruit Salad',
  'Yogurt Parfait', 'Yellow Curry', 'Yam Fries', 'Yeast Rolls',
  'Zucchini Noodles', 'Zesty Chicken', 'Zebra Cake', 'Ziti Pasta',
];

const dailyRoutine = {
  Breakfast: ['Oatmeal', 'Fruit Salad'],
  Lunch: ['Rice Bowl', 'Salad'],
  Dinner: ['Grilled Chicken', 'Vegetable Stir Fry'],
  Snacks: ['Smoothie', 'Nuts']
};

const MealLog = () => {
  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('meals');
    return saved ? JSON.parse(saved) : {};
  });

  const [meal, setMeal] = useState('');
  const [category, setCategory] = useState('Breakfast');

  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    if (meal.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = suggestions.filter(sugg =>
      sugg.toLowerCase().includes(meal.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [meal, suggestions]);

  const handleAddMeal = () => {
    if (!meal.trim()) return;

    const updatedMeals = { ...meals };
    if (!updatedMeals[currentDate]) updatedMeals[currentDate] = {};
    if (!updatedMeals[currentDate][category]) updatedMeals[currentDate][category] = [];

    updatedMeals[currentDate][category].push({
      name: meal.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setMeals(updatedMeals);

    if (!suggestions.includes(meal.trim())) {
      setSuggestions([meal.trim(), ...suggestions]);
    }

    setMeal('');
    setShowSuggestions(false);
  };

  const handleDelete = (cat, index) => {
    const updated = { ...meals };
    updated[currentDate][cat].splice(index, 1);
    setMeals(updated);
  };

  const handleSuggestionClick = (text) => {
    setMeal(text);
    setShowSuggestions(false);
  };

  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e, sugg) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSuggestionClick(sugg);
    }
  };

  const handleAddDailyRoutine = () => {
    const updatedMeals = { ...meals };
    if (!updatedMeals[currentDate]) updatedMeals[currentDate] = {};

    categories.forEach(cat => {
      if (!updatedMeals[currentDate][cat]) updatedMeals[currentDate][cat] = [];

      dailyRoutine[cat].forEach(routineMeal => {
        const exists = updatedMeals[currentDate][cat].some(m => m.name === routineMeal);
        if (!exists) {
          updatedMeals[currentDate][cat].push({
            name: routineMeal,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });

          if (!suggestions.includes(routineMeal)) {
            setSuggestions(prev => [routineMeal, ...prev]);
          }
        }
      });
    });

    setMeals(updatedMeals);
  };

  return (
    <div className="meal-log" ref={wrapperRef}>
      <h2>🍽️ Meal Log - {currentDate}</h2>

      <button
        className="daily-routine-btn"
        onClick={handleAddDailyRoutine}
        aria-label="Add daily routine meals"
      >
        🕒 Add Daily Routine
      </button>

      <div className="meal-input" style={{ position: 'relative' }}>
        <select
          aria-label="Select meal category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          aria-label={`Add ${category.toLowerCase()}`}
          value={meal}
          placeholder={`Add ${category.toLowerCase()}...`}
          onChange={(e) => setMeal(e.target.value)}
          onFocus={() => {
            if (filteredSuggestions.length) setShowSuggestions(true);
          }}
          autoComplete="off"
          spellCheck="false"
        />
        <button onClick={handleAddMeal} aria-label="Add meal">Add</button>

        <div className={`suggestions ${showSuggestions ? 'show' : ''}`} role="listbox" aria-label="Meal suggestions">
          <ul>
            {filteredSuggestions.map((sugg, idx) => (
              <li
                key={idx}
                onClick={() => handleSuggestionClick(sugg)}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, sugg)}
                role="option"
                aria-selected={false}
              >
                {sugg}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="meal-categories" role="list">
        {categories.map(cat => (
          <section key={cat} className="meal-section" aria-label={`${cat} meals`}>
            <h3>{cat}</h3>
            <ul>
              {(meals[currentDate]?.[cat] || []).map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  <small>{item.time}</small>
                  <button
                    onClick={() => handleDelete(cat, index)}
                    aria-label={`Delete ${item.name} from ${cat}`}
                    title="Delete meal"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MealLog;
