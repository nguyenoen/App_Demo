const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://nguyenoen:V9OE7HD7X1IuFoRL@cluster0.krwm8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // 1.Find a Document

    // Query for a movie that has the title 'The Room'
    const query1 = { title: "The Room" };
    const options1 = {
      // Sort matched documents in descending order by rating
      sort: { "imdb.rating": -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    // Execute query
    const movie = await movies.findOne(query1, options1);
    // Print the document returned by findOne()
    console.log(movie);

    // 2.Find Multiple Documents
    // Query for movies that have a runtime less than 15 minutes
    const queryn = { runtime: { $lt: 15 } };
    const optionsn = {
      // Sort returned documents in ascending order by title (A->Z)
      sort: { title: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    // Execute query 
    const cursor = movies.find(queryn, optionsn);
    // Print a message if no documents were found
    if ((await movies.countDocuments(queryn)) === 0) {
      console.log("No documents found!");
    }
    // Print returned documents
    for await (const doc of cursor) {
      console.dir(doc);
    }

    // 3. Insert a Document
    
    // Create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    // Insert the defined document into the "haiku" collection
    const result = await haiku.insertOne(doc);
    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);