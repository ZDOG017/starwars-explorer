// /swapi-react/src/PlanetDetails.js

import React, { useState, useEffect } from 'react';

function PlanetDetails({ url }) {
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPlanet(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch planet details');
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!planet) return null;

  return (
    <div className="details">
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
    </div>
  );
}

export default PlanetDetails;
