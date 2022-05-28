require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');

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
    const collection = client.db('knygu-projektas').collection('knygos');
    const anotherResult = await collection.find({}).toArray();
    response.json(anotherResult);
    client.close();
  });
});

const newBook = {
  title: "siuvejo byla",
  pages: 150,
  price: 4.5
}
  


app.post('/books', (req, res) => {
  client.connect(async () => {
    const collection = client.db('knygu-katalogas').collection('knygos');
    const result = await collection.insertOne({
      title: req.body.title,
      pages: req.body.pages,
      price: req.body.price,
          });
    res.json(result);
    client.close();
  });
});