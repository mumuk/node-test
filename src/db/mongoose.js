const mongoose = require('mongoose'); //

//Создаем соединение
// mongoose.connect('mongodb://localhost:27017/users-serv', {
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.error(error));

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});