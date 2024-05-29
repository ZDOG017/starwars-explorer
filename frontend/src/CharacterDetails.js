import React, { useState, useEffect } from 'react';

function CharacterDetails({ url }) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch character details');
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!character) return null;

  return (
    <div className="details">
      <p>Height: {character.height}</p>
      <p>Mass: {character.mass}</p>
      <p>Hair Color: {character.hair_color}</p>
      <p>Skin Color: {character.skin_color}</p>
      <p>Eye Color: {character.eye_color}</p>
      <p>Birth Year: {character.birth_year}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
}

export default CharacterDetails;
