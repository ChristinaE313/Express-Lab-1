// require the Express module
const express = require("express");
const cors = require("cors"); 
const cart = require('./cart');

// creates an instance of an Express server
const app = express();

//allows us to use query string params, path params, and body
//all in request object
app.use(express.json());
app.use(cors());
// define the port
const port = 3000;
 
app.use("/cart/", cart); 


// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));

console.log("http://localhost:" + port + "/cart");
