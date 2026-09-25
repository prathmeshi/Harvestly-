const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Harvestly API is running');
});

app.get('/api/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Onion',
      quantity: '500 kg',
      farmer: 'Farmer 1'
    },
    {
      id: 2,
      name: 'Tomato',
      quantity: '300 kg',
      farmer: 'Farmer 2'
    }
  ]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Harvestly server running on http://localhost:${PORT}`);
});