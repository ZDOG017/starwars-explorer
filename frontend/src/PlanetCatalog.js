// /swapi-react/src/PlanetCatalog.js

import React, { useEffect, useState } from 'react';
import './StarWarsTheme.css';

function PlanetCatalog() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/planets');
        const data = await response.json();
        setPlanets(data.results);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch planets');
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="PlanetCatalog">
      <h1>Star Wars Planets</h1>
      <ul>
        {planets.map(planet => (
          <li key={planet.name}>
            <h2>{planet.name}</h2>
            <p>Climate: {planet.climate}</p>
            <p>Population: {planet.population}</p>
            <p>Terrain: {planet.terrain}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanetCatalog;
