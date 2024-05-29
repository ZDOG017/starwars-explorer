// /swapi-react/src/StarshipDetails.js

import React, { useState, useEffect } from 'react';

function StarshipDetails({ url }) {
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStarship = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setStarship(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch starship details');
        setLoading(false);
      }
    };

    fetchStarship();
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!starship) return null;

  return (
    <div className="details">
      <p>Model: {starship.model}</p>
      <p>Manufacturer: {starship.manufacturer}</p>
      <p>Cost: {starship.cost_in_credits}</p>
      <p>Length: {starship.length}</p>
      <p>Crew: {starship.crew}</p>
      <p>Passengers: {starship.passengers}</p>
    </div>
  );
}

export default StarshipDetails;
