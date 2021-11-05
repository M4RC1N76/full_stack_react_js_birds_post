const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  // INDEX
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });


  // SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) }) // retrieving the data from DB
      .then((doc) => res.json(doc)) // response as json
      .catch((err) => { // optional
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // //CREATE 
  router.post('/', (req, res) => {
    // console.log('Hello!')})
    const newData = req.body;
    //console.log(newData)
    collection
      .insertOne(newData)
      .then(result => res.json(result.ops[0])) // result.ops[0] first object deleted - result.ops[0] -
      .catch((err) => { // interesting behaviour when [1]
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

    //UPDATE
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection
      .updateOne(
        { _id: ObjectID(id) },
        { $set: updatedData }
      )
      .then(result => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //DESTROY/DELETE
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) }) // delete obj with specific id
      .then(result => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });



  return router;
};

module.exports = createRouter;
