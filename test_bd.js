const test = require("./controllers/auth");

// console.log(test.register('my_Name', 'oiuy1'))
console.log(test.register({  "username": "john_doe",
    "password": "password123"}))