const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router'); // c_r.js (.js- removed)
const cors = require('cors');

app.use(express.json()); // added
app.use(cors());



// const MongoClient = require('mongodb').MongoClient;
// const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('birds');
    const sightingsCollection = db.collection('sightings');
    const sightingsRouter = createRouter(sightingsCollection);
    app.use('/api/sightings', sightingsRouter);
    
  })
  .catch(console.err); // Is it the short version?

app.listen(5000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
