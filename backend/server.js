// /swapi-express/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/planets', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/planets/');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from SWAPI:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from SWAPI' });
  }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.name;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "name" is required' });
  }
  try {
    const [peopleResponse, planetsResponse, starshipsResponse] = await Promise.all([
      axios.get(`https://swapi.dev/api/people/?search=${query}`),
      axios.get(`https://swapi.dev/api/planets/?search=${query}`),
      axios.get(`https://swapi.dev/api/starships/?search=${query}`)
    ]);

    res.json({
      people: peopleResponse.data.results,
      planets: planetsResponse.data.results,
      starships: starshipsResponse.data.results
    });
  } catch (error) {
    console.error('Error fetching data from SWAPI:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from SWAPI' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
