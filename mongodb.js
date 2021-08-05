const mongodb = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');

// Connection URL
//const url = 'mongodb://127.0.0.1:27017'
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'users-serv'

async function main() {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  const collection = db.collection('users')

  db.collection('users').insertOne({
    name: "Steve Smith4",
    email: "SteveSm@ukr.net",
    password: "1234567"
  },(error,result)=>{
    if(error){
      return console.log('Unable to insert user')
    }
    console.log(result)
  })


}


main()
  .then(console.log)
  .catch(console.error)
  // .finally(() => client.close())
