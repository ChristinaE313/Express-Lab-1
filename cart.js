const express = require("express"); 
const cart = express.Router(); 

const cartItems = [
    {
        id: 1,
        product: "coffee", 
        quantity: 10, 
        price: 5.50, 
        
    },
    {
        id: 2,
        product: "sugar", 
        quantity: 5, 
        price: 1, 
        
    }, 
    {
        id: 3,
        product: "creamer", 
        quantity: 2, 
        price: 3, 
        
    }  
]; 

// 1. GET /cart-items
// a. Action: None
// b. Response: a JSON array of all cart items
// c. Response Code: 200 (OK)
// d. Query string parameters: the request may have one of the following or it may
// have none. (See tests below for examples.)
// i. maxPrice - if specified, only include products that are at or below this
// price.
// ii. prefix - if specified, only includes products that start with the given
// string in the response array.
// iii. pageSize - if specified, only includes up to the given number of items in
// the response array. For example, if there are ten items total, but
// pageSize=5, only return an array of the first five items

cart.get("/", (req, res) =>{
    res.status(200)
    res.json(cartItems);
})

cart.get("/", (req, res) =>{
    let price = parseInt(req.query.maxPrice); 
    let filteredPrice = []; 

    for(let p of price){
        if(p.price <= price){
            filteredPrice.push(p); 
        }
    }
    res.json(filteredPrice); 
})

// GET /cart-items/:id
// a. Action: None
// b. Response: a JSON object of the item with the given ID
// c. Response Code: 200 (OK)
// d. However, if the item with that ID cannot be found in the array, return a string
// response “ID Not Found” with response code 404 (Not Found)

cart.get("/:id", (req, res)=>{
    // use this id as a way of finding your item
    console.log(req.params.id); 
    const item = cartItems.find((c) => c.id === parseInt(req.params.id));
    
    if(!item){
        res.status(404).send('ID Not Found'); 
    } 
    res.json(item); 
})

// POST /cart-items
// a. Action: Add a cart item to the array using the JSON body of the request. Also
// generate a unique ID for that item.
// b. Response: the added cart item object as JSON.
// c. Response Code: 201 (Created)

cart.post("/", (req, res)=>{
   const getLastId = cartItems.length +1; 
   
    let newItem = {
        id: getLastId,   
        product: req.body.product,  
        quantity: parseInt(req.body.quantity), 
        price: parseInt(req.body.price)
    }

    cartItems.push(newItem); 
    res.status(201); 
    res.json(cartItems); 
})

// PUT /cart-items/:id
// a. Action: Update the cart item in the array that has the given id. Use the JSON
// body of the request as the new properties.
// b. Response: the updated cart item object as JSON.
// c. Response Code: 200 (OK).

cart.put("/:id", (req, res)=>{
    const index = cartItems.findIndex((item) => item.id === parseInt(req.params.id)); 
    const newCart = req.body; 

    cartItems.splice(index, 1, newCart); 
    res.status(200); 
    res.json(newCart); 
})

// DELETE /cart-items/:id
// a. Action: Remove the item from the array that has the given ID.
// b. Response: Empty
// c. Response Code: 204 (No Content)

cart.delete("/:id", (req, res)=> {
    const index = cartItems.findIndex((item) => item.id === parseInt(req.params.id)); 
    
    cartItems.splice(index, 1);
    res.status(204); 
    res.json("Empty");
})

module.exports = cart;