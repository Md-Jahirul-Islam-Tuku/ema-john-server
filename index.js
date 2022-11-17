const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fqmp7pn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
   try {
      const productsCollection = client.db("emaJohn").collection("products");
      app.get('/products', async (req, res) => {
         const page = parseInt(req.query.page);
         const size = parseInt(req.query.size);
         const query = {}
         const cursor = productsCollection.find(query)
         const products = await cursor.skip(page*size).limit(size).toArray();
         const count = await productsCollection.countDocuments();
         res.send({ count, products })
      })
   }
   finally {

   }
}
run().catch(err => console.error(err))


app.get('/', (req, res) => {
   res.send('ema john server is running...')
})
app.listen(port, () => {
   console.log(`ema john server listening on ${port}`);
})