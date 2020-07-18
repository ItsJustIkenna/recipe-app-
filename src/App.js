import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App =() => {

  const APP_ID = '875a2834';
  const APP_KEY = 'b61b08a329d792a4eda5a241a72643d9';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  
  useEffect( ()=> {
    getRecipes();
  }, [query]);

const getRecipes = async () => {
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
  );
  const data = await response.json();
 setRecipes(data.hits);
 console.log(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
};

  return (
    <div className="App">
      <form onSubmit={getSearch}
      className="search-form">
        <input
        className="search-bar"
        type="text" value={search}
        onChange={updateSearch}></input>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
      />
      ))}
      </div>
    </div>
  );
};

console.log('Hello');

export default App;
