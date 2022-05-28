require('dotenv').config();
const express = require('express');
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} = require('mongodb');

const cors = require('cors');
const { ObjectID } = require('bson');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));


const uri = 'mongodb+srv://TK:TK2400@cluster0.y5udm.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.listen(process.env.PORT, () => {
  console.log('Serveris paleistas. Laukia užklausų');
});

app.get('/books', (req, response) => {
  client.connect(async () => {
    const collection = client.db('knygu-katalogas').collection('knygos');
    const result = await collection.find({}).toArray();
    response.json(result);
    client.close();
  });
});

// const newBook = {
//   title: "siuvejo byla",
//   pagesCount: 150,
//   price: 4.5
// }


// collection galima iskelti i .env (kaip aplinkos koda) pvz DB_NAME = "knygu-projektas"
//  DB_COLLECTION_NAME ir t.t.
// DB_URI - tokiu budu neliktu nei user namo nei slaptazodio kode
//  tada process.env.URI / env.DB_name ir t.t.

app.post('/books', (req, res) => {
  client.connect(async () => {
    const collection = client.db('knygu-katalogas').collection('knygos');
    const result = await collection.insertOne({
      title: req.body.title,
      pagesCount: req.body.pageCount,
      price: req.body.price,
    });
    res.json(result);
    client.close();
  });
});


app.delete('/books', (req, res) => {
  console.log(ObjectId(req.body.id))
  client.connect(async () => {
    const collection = client.db('knygu-katalogas').collection('knygos');
    const result = await collection.deleteOne({
      _id: ObjectId(req.body.id)
    })
    res.json(result);
    client.close();
  });
});

