const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
const cors = require('cors');

const tokenUrl = 'http://20.244.56.144/train/auth'; 
const data = {
    companyName: 'Ashwin Railway Networks',
    clientID: '601fb8d3-867d-49e4-85e0-20ca25d0180b',
    ownerName: 'Ashwin',
    ownerEmail: 'ashwinrb74@gmail.com',
    rollNo: '1NT20CS141',
    clientSecret: 'TcZBdkVOOHajmaxU',
};

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIwODAzNDcsImNvbXBhbnlOYW1lIjoiQXNod2luIFJhaWx3YXkgTmV0d29ya3MiLCJjbGllbnRJRCI6IjYwMWZiOGQzLTg2N2QtNDllNC04NWUwLTIwY2EyNWQwMTgwYiIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIxTlQyMENTMTQxIn0.GlIlMR-sVL-0fAncYuqO73illeWP74ZdumHyIZ3v_70'; // Initialize an empty token
const apiUrlServer = 'http://20.244.56.144/train/trains'; 

app.use(cors());

const fetchAccessToken = async () => {
  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);
  } catch (error) {
    console.error('Error fetching access token:', error.message);
  }
};

fetchAccessToken();

app.get('/getData', async (req, res) => {
  try {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(apiUrlServer, { headers });
    const jsonData = response.data;
    res.json(jsonData);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Error fetching data from the server.' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
