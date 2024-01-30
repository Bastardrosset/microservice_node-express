const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => {
    const event = req.body
    
    axios.post('http://localhost:5000/events', event).catch((err) => {
    console.log(err.message);
  });
    axios.post('http://localhost:5001/events', event).catch((err) => {
    console.log(err.message);
  });
    axios.post('http://localhost:5002/events', event).catch((err) => {
    console.log(err.message);
  });

    res.send({ status: "ok" })
})

app.listen(5005, () => {
    console.log('listening on port 5005')
})