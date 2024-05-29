// /swapi-react/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import PlanetCatalog from './PlanetCatalog';
import CharacterDetails from './CharacterDetails';
import PlanetDetails from './PlanetDetails';
import StarshipDetails from './StarshipDetails';
import './App.css';
import './StarWarsTheme.css';

function Home() {
  const [results, setResults] = useState({ people: [], planets: [], starships: [] });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/search?name=${search}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleItemClick = (item, type) => {
    if (selectedItem && selectedItem.url === item.url) {
      // If the item is already selected, deselect it
      setSelectedItem(null);
      setItemType('');
    } else {
      // Otherwise, select the item
      setSelectedItem(item);
      setItemType(type);
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Explorer</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search characters, planets, starships"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div>
        <h2>Characters</h2>
        <ul>
          {results.people.map(person => (
            <li key={person.name} onClick={() => handleItemClick(person, 'character')}>
              {person.name}
              {selectedItem && selectedItem.url === person.url && itemType === 'character' && (
                <CharacterDetails url={person.url} />
              )}
            </li>
          ))}
        </ul>
        <h2>Planets</h2>
        <ul>
          {results.planets.map(planet => (
            <li key={planet.name} onClick={() => handleItemClick(planet, 'planet')}>
              {planet.name}
              {selectedItem && selectedItem.url === planet.url && itemType === 'planet' && (
                <PlanetDetails url={planet.url} />
              )}
            </li>
          ))}
        </ul>
        <h2>Starships</h2>
        <ul>
          {results.starships.map(starship => (
            <li key={starship.name} onClick={() => handleItemClick(starship, 'starship')}>
              {starship.name}
              {selectedItem && selectedItem.url === starship.url && itemType === 'starship' && (
                <StarshipDetails url={starship.url} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planets" element={<PlanetCatalog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
