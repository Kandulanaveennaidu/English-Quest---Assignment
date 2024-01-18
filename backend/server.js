const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const usersRoute = require('./routes/usersRoute');
const error = require('./middlewares/errorMiddlewareHandler');
const dotenv = require('dotenv');
const bookRoute = require('./routes/bookRoutes');

//call the .env function
dotenv.config();

const app = express();

app.use(cors());

//db connect
dbConnect();


app.use(express.json());

//routes
//users
app.use('/api/users', usersRoute); // the rest of the path (/register, /login) is in usersRoute file
//books
app.use('/api/books', bookRoute);


app.use(error.errorMiddlewareHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})
