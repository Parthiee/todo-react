const {MongoClient} = require('mongodb')

async function database()
{
   try
   {
    
   const client = new MongoClient('mongodb://127.0.0.1:27017');
   await client.connect();
   const db = client.db('todo')

   return db
  }

  catch(e)
  {
    console.log(e)
  }


}

module.exports = database;