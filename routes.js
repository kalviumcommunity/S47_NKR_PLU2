const express = require('express');

const app = express();
app.use(express.json());

const jsondata = [
  { message: 'Hello, Nayan here!',
  name: 'Nayan',
  country: 'USA',
  age: 21,
  married: true,
  identification: '1234567890',
  gender: 'male',
  address: '123 Main St, Anytown USA',
  timestamp: Date.now()
},
{
  name: 'John Locke',
  email: 'johnlocke@west.com'
},
{
  name: 'John Doe',
  email: 'johndoe@west.com'
}
]

// Define a route
app.get('/ping', (req, res) => {
  res.json(jsondata)
}).get('/about', (req, res) => {
  res.send('This is the About page');
})

app.post('/ping', (req, res) => {
  const body = req.body;

  if (body && Object.keys(body).length > 0) {
    jsondata.push(body);
    res.json(jsondata);
  } else {
    res.status(400).send('Bad Request: Request body is empty or contains only empty properties');
  }
});


app.put('/ping/:index', (req, res) => {
  const index = req.params.index;
  const updateProperties = req.body;

  if (index >= 0 && index < jsondata.length) {
    jsondata[index] = { ...jsondata[index], ...updateProperties };
    res.json(jsondata);
  } else {
    res.status(404).send('Index not found');
  }
});

app.delete('/ping/:index', (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < jsondata.length) {
    jsondata.splice(index, 1); 
    res.json(jsondata);
  } else {
    res.status(404).send('Index not found');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});